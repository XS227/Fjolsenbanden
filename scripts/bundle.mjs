import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(process.cwd());
const entryFile = path.join(projectRoot, "src", "main.jsx");
const distDir = path.join(projectRoot, "dist");
const assetsDir = path.join(distDir, "assets");

const modules = new Map();
const externalGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-dom/client": "ReactDOM",
};

const extensionOrder = ["", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".json"];
const indexOrder = ["/index.js", "/index.jsx", "/index.ts", "/index.tsx", "/index.mjs", "/index.cjs", "/index.json"];

async function pathExists(candidate) {
  try {
    const stat = await fs.stat(candidate);
    return stat.isFile();
  } catch (error) {
    return false;
  }
}

async function resolveFile(rawPath) {
  const ext = path.extname(rawPath);
  if (ext) {
    if (await pathExists(rawPath)) {
      return rawPath;
    }
  }

  for (const suffix of extensionOrder) {
    if (suffix && rawPath.endsWith(suffix)) {
      continue;
    }
    const candidate = `${rawPath}${suffix}`;
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  for (const suffix of indexOrder) {
    const candidate = `${rawPath}${suffix}`;
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Unable to resolve module at ${rawPath}`);
}

function normalizeId(filePath) {
  return path.relative(projectRoot, filePath).replace(/\\/g, "/");
}

function transpileToCommonJS(sourceText, filePath) {
  if (filePath.endsWith(".json")) {
    return `module.exports = ${sourceText.trim()};`;
  }

  const transpiled = ts.transpileModule(sourceText, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2019,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowSyntheticDefaultImports: true,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    },
    fileName: filePath,
    reportDiagnostics: false,
  });

  if (!transpiled.outputText) {
    throw new Error(`Failed to transpile ${filePath}`);
  }

  return transpiled.outputText;
}

function extractRequires(code) {
  const requires = new Set();
  const pattern = /require\((['"])([^'"\n]+)\1\)/g;
  let match;
  while ((match = pattern.exec(code)) !== null) {
    requires.add(match[2]);
  }
  return Array.from(requires);
}

async function resolveDependency(specifier, importerPath) {
  if (specifier.startsWith("node:")) {
    return { type: "external", name: specifier };
  }

  if (specifier.startsWith("@/")) {
    const target = path.join(projectRoot, "src", specifier.slice(2));
    const resolved = await resolveFile(target);
    return { type: "module", path: resolved, id: normalizeId(resolved) };
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const target = path.resolve(path.dirname(importerPath), specifier);
    const resolved = await resolveFile(target);
    return { type: "module", path: resolved, id: normalizeId(resolved) };
  }

  try {
    const resolvedPath = require.resolve(specifier, { paths: [path.dirname(importerPath)] });
    const resolved = await resolveFile(resolvedPath);
    return { type: "module", path: resolved, id: normalizeId(resolved) };
  } catch (error) {
    return { type: "external", name: specifier };
  }
}

async function processModule(filePath) {
  const resolvedPath = await resolveFile(filePath);
  if (modules.has(resolvedPath)) {
    return;
  }

  const source = await fs.readFile(resolvedPath, "utf8");
  const code = transpileToCommonJS(source, resolvedPath);
  const requires = extractRequires(code);

  const deps = {};
  for (const specifier of requires) {
    const resolution = await resolveDependency(specifier, resolvedPath);
    if (resolution.type === "module") {
      deps[specifier] = resolution.id;
      await processModule(resolution.path);
    } else {
      deps[specifier] = `#external:${resolution.name}`;
      if (!(resolution.name in externalGlobals)) {
        externalGlobals[resolution.name] = resolution.name;
      }
    }
  }

  const id = normalizeId(resolvedPath);
  modules.set(resolvedPath, { id, code, deps });
}

function renderModulesObject() {
  const entries = Array.from(modules.values()).map(({ id, code, deps }) => {
    const depsSerialized = JSON.stringify(deps, null, 2);
    return `  ${JSON.stringify(id)}: {\n    deps: ${depsSerialized},\n    fn: function(require, module, exports) {\n${code}\n    }\n  }`;
  });
  return `{
${entries.join(",\n")}
}`;
}

function renderExternalsObject() {
  return JSON.stringify(externalGlobals, null, 2);
}

async function copyPublicAssets() {
  const publicDir = path.join(projectRoot, "public");
  try {
    const entries = await fs.readdir(publicDir, { withFileTypes: true });
    await fs.mkdir(distDir, { recursive: true });
    for (const entry of entries) {
      const sourcePath = path.join(publicDir, entry.name);
      const targetPath = path.join(distDir, entry.name);
      if (entry.isDirectory()) {
        await fs.cp(sourcePath, targetPath, { recursive: true });
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function build() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(assetsDir, { recursive: true });

  await processModule(entryFile);
  const entryId = normalizeId(await resolveFile(entryFile));

  const modulesObject = renderModulesObject();
  const externalsObject = renderExternalsObject();

            const bundle = String.raw`// Generated bundle
(function(modules, externals) {
  const cache = {};

  function resolveGlobal(name) {
    const mapping = externals[name];
    if (!mapping) {
      throw new Error('External module "' + name + '" was not provided.');
    }
    if (typeof mapping === 'string') {
      const parts = mapping.split('.');
      let current = globalThis;
      for (const part of parts) {
        if (current == null) {
          throw new Error('Global ' + mapping + ' for external ' + name + ' was not found.');
        }
        current = current[part];
      }
      if (current == null) {
        throw new Error('Global ' + mapping + ' for external ' + name + ' was not found.');
      }
      return current;
    }
    throw new Error('Unsupported external mapping for ' + name + '.');
  }

  function load(id) {
    if (cache[id]) {
      return cache[id].exports;
    }
    const record = modules[id];
    if (!record) {
      throw new Error('Module "' + id + '" not found in bundle.');
    }
    const module = { exports: {} };
    cache[id] = module;

    function localRequire(specifier) {
      const target = record.deps[specifier];
      if (!target) {
        throw new Error('Unable to resolve "' + specifier + '" from module "' + id + '".');
      }
      if (target.startsWith('#external:')) {
        const name = target.slice('#external:'.length);
        return resolveGlobal(name);
      }
      return load(target);
    }

    record.fn(localRequire, module, module.exports);
    return module.exports;
  }

  load(${JSON.stringify(entryId)});
})( ${modulesObject}, ${externalsObject} );
`;




await fs.writeFile(path.join(assetsDir, "bundle.js"), bundle, "utf8");

  const html = `<!DOCTYPE html>\n<html lang="no">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>Fjolsenbanden – Spillglede for hele familien</title>\n    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />\n    <link rel="apple-touch-icon" href="/favicon.svg" />\n    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>\n    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="/assets/bundle.js"></script>\n  </body>\n</html>\n`;

  await fs.writeFile(path.join(distDir, "index.html"), html, "utf8");
  await copyPublicAssets();
  console.log(`Bundled application to ${path.relative(projectRoot, distDir)}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
