import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const moduleCache = new Map();

function resolveWithExtensions(targetPath) {
  const attempts = ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"];
  for (const suffix of attempts) {
    const candidate = `${targetPath}${suffix}`;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  throw new Error(`Unable to resolve module at ${targetPath}`);
}

function loadTsModule(entryPath) {
  const resolvedPath = resolveWithExtensions(entryPath);
  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(resolvedPath).exports;
  }

  const source = fs.readFileSync(resolvedPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2019,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowSyntheticDefaultImports: true,
    },
    fileName: resolvedPath,
  });

  const module = { exports: {} };
  moduleCache.set(resolvedPath, module);

  const localRequire = createRequire(resolvedPath);
  const requireFn = (specifier) => {
    if (specifier === "framer-motion") {
      const motionProxy = new Proxy(
        {},
        {
          get: (_target, element) => {
            const tag = String(element);
            return React.forwardRef((props, ref) => {
              const {
                animate,
                initial,
                transition,
                exit,
                whileHover,
                whileTap,
                whileInView,
                variants,
                layout,
                ...rest
              } = props ?? {};
              return React.createElement(tag, { ...rest, ref });
            });
          },
        },
      );

      return {
        motion: motionProxy,
        AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
        useReducedMotion: () => true,
      };
    }

    if (specifier.startsWith("@/")) {
      const target = path.join(projectRoot, "src", specifier.slice(2));
      return loadTsModule(target);
    }

    if (specifier.startsWith("./") || specifier.startsWith("../")) {
      const target = path.resolve(path.dirname(resolvedPath), specifier);
      return loadTsModule(target);
    }

    return localRequire(specifier);
  };

  const wrapper = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    transpiled.outputText,
  );

  wrapper(requireFn, module, module.exports, resolvedPath, path.dirname(resolvedPath));

  return module.exports;
}

const componentModule = loadTsModule(
  path.join(projectRoot, "src/components/FjolsenbandenBrandMock"),
);
const FjolsenbandenBrandMock = componentModule.default ?? componentModule;

const markup = ReactDOMServer.renderToStaticMarkup(
  React.createElement(FjolsenbandenBrandMock),
);
const prettyMarkup = markup.replace(/></g, ">\n<");

const htmlDocument = `<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fjolsenbanden – Spillglede for hele familien</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <meta property="og:title" content="Fjolsenbanden – Spillglede for hele familien" />
    <meta property="og:description" content="Trygge streams, premier og Vipps-verifisering i et familievennlig gaming-community." />
    <meta property="og:image" content="/og-image.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/og-image.svg" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      :root {
        color-scheme: dark;
      }
      body {
        margin: 0;
        font-family: "Inter", "Segoe UI", system-ui, -apple-system, Roboto, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        background: #020824;
      }
    </style>
  </head>
  <body>
    ${prettyMarkup}
  </body>
</html>
`;

const outputPath = path.join(projectRoot, "index.html");
fs.writeFileSync(outputPath, htmlDocument, "utf8");

console.log(`Updated ${path.relative(projectRoot, outputPath)} using FjolsenbandenBrandMock.`);
