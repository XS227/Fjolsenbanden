"""Template helpers for loading Vite-built assets."""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional

from django import template
from django.conf import settings

register = template.Library()


@dataclass
class ViteAsset:
    """Represents a Vite build entry with its dependencies."""

    file: str
    css: List[str]
    imports: List[str]


def _manifest_path() -> Path:
    return Path(settings.BASE_DIR) / "fjolsenbanden_site" / "static" / "dist" / ".vite" / "manifest.json"


def _load_manifest() -> Optional[Dict]:
    manifest_path = _manifest_path()
    if not manifest_path.exists():
        return None
    try:
        return json.loads(manifest_path.read_text())
    except json.JSONDecodeError:
        return None


def _static_url(path: str) -> str:
    static_root = settings.STATIC_URL.rstrip("/")
    return f"{static_root}/dist/{path}"


def _collect_imports(manifest: Dict, entry: Dict) -> Iterable[str]:
    for imported in entry.get("imports", []):
        if imported in manifest and "file" in manifest[imported]:
            yield _static_url(manifest[imported]["file"])


@register.simple_tag()
def vite_entry(entrypoint: str) -> Optional[ViteAsset]:
    """Resolve a Vite entrypoint from ``manifest.json``.

    Usage in templates::

        {% load vite %}
        {% vite_entry "index.html" as entry %}
        {% if entry %}
          <link rel="stylesheet" href="{{ entry.css.0 }}" />
          <script type="module" src="{{ entry.file }}" crossorigin></script>
        {% endif %}
    """

    manifest = _load_manifest()
    if not manifest:
        return None

    chunk = manifest.get(entrypoint)
    if not chunk or "file" not in chunk:
        return None

    css_files = [_static_url(path) for path in chunk.get("css", [])]
    imports = list(_collect_imports(manifest, chunk))

    return ViteAsset(file=_static_url(chunk["file"]), css=css_files, imports=imports)
