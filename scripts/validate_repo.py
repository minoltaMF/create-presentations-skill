#!/usr/bin/env python3
"""Run provider-free structural and example checks for this repository."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "create-presentations"
SKILL_MD = SKILL / "SKILL.md"

REQUIRED = [
    ROOT / "README.md",
    ROOT / "README.zh-CN.md",
    ROOT / "LICENSE",
    SKILL_MD,
    SKILL / "agents" / "openai.yaml",
    SKILL / "scripts" / "validate_deck_manifest.py",
    SKILL / "references" / "codex-native-pptx.md",
    SKILL / "references" / "production-profiles.md",
    SKILL / "references" / "visual-production.md",
    SKILL / "assets" / "brief-template.md",
    SKILL / "assets" / "page-plan-template.md",
    ROOT / "assets" / "readme" / "demo-hero.png",
    ROOT / "assets" / "readme" / "route-comparison.png",
    ROOT / "assets" / "readme" / "style-gallery.png",
    SKILL / "assets" / "style-gallery.png",
    ROOT / "docs" / "STYLE_GALLERY.md",
    ROOT / "examples" / "create-presentations-overview" / "create-presentations-overview.pptx",
    ROOT / "examples" / "create-presentations-overview" / "create-presentations-style-showcase.pptx",
    ROOT / "examples" / "create-presentations-overview" / "create-presentations-overview.html",
    ROOT / "examples" / "create-presentations-overview" / "contact-sheet.png",
    ROOT / "examples" / "create-presentations-overview" / "deck-manifest.json",
    ROOT / "examples" / "create-presentations-overview" / "style-showcase-manifest.json",
]


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def check_markdown_links(path: Path, errors: list[str]) -> None:
    text = path.read_text(encoding="utf-8")
    for match in re.finditer(r"!?(?:\[[^\]]*\])\(([^)]+)\)", text):
        target = match.group(1).strip().split("#", 1)[0]
        if not target or target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            fail(f"{path.relative_to(ROOT)} links to missing {target}", errors)


def main() -> int:
    errors: list[str] = []
    for path in REQUIRED:
        if not path.exists():
            fail(f"missing required file: {path.relative_to(ROOT)}", errors)

    if SKILL_MD.exists():
        content = SKILL_MD.read_text(encoding="utf-8")
        lines = content.splitlines()
        if len(lines) >= 500:
            fail(f"SKILL.md must stay under 500 lines; found {len(lines)}", errors)
        frontmatter = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
        if not frontmatter:
            fail("SKILL.md must start with YAML frontmatter", errors)
        else:
            block = frontmatter.group(1)
            if not re.search(r"^name:\s*create-presentations\s*$", block, re.MULTILINE):
                fail("SKILL.md name must be create-presentations", errors)
            description = re.search(r"^description:\s*(.+)$", block, re.MULTILINE)
            if not description or len(description.group(1).strip()) < 40:
                fail("SKILL.md needs a descriptive trigger-oriented description", errors)

    for path in ROOT.rglob("*.md"):
        if ".git" not in path.parts:
            check_markdown_links(path, errors)

    secret_patterns = [
        re.compile(r"sk-[A-Za-z0-9_-]{20,}"),
        re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
        re.compile(r"(?:OPENAI|ANTHROPIC|GOOGLE|GEMINI)_API_KEY\s*=\s*\S+"),
    ]
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts or path.suffix.lower() in {".png", ".pptx"}:
            continue
        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for pattern in secret_patterns:
            if pattern.search(content):
                fail(f"possible secret in {path.relative_to(ROOT)}", errors)

    validator = SKILL / "scripts" / "validate_deck_manifest.py"
    manifests = [
        ROOT / "examples" / "create-presentations-overview" / "deck-manifest.json",
        ROOT / "examples" / "create-presentations-overview" / "style-showcase-manifest.json",
    ]
    for args in (["--self-test"], *([str(manifest)] for manifest in manifests)):
        result = subprocess.run(
            [sys.executable, str(validator), *args],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        if result.returncode != 0:
            fail(f"manifest validator failed for {' '.join(args)}: {result.stderr.strip()}", errors)

    for manifest in manifests:
        if not manifest.exists():
            continue
        payload = json.loads(manifest.read_text(encoding="utf-8"))
        for output in payload.get("outputs", []):
            output_path = manifest.parent / output.get("path", "")
            if not output_path.is_file():
                fail(f"manifest output is missing: {output_path.relative_to(ROOT)}", errors)
                continue
            actual_size = output_path.stat().st_size
            actual_sha = hashlib.sha256(output_path.read_bytes()).hexdigest()
            if output.get("byteSize") != actual_size:
                fail(f"manifest byteSize mismatch for {output_path.relative_to(ROOT)}", errors)
            if output.get("sha256") != actual_sha:
                fail(f"manifest sha256 mismatch for {output_path.relative_to(ROOT)}", errors)

    pptx_files = [
        ROOT / "examples" / "create-presentations-overview" / "create-presentations-overview.pptx",
        ROOT / "examples" / "create-presentations-overview" / "create-presentations-style-showcase.pptx",
    ]
    for pptx in pptx_files:
        if pptx.exists() and pptx.read_bytes()[:2] != b"PK":
            fail(f"{pptx.relative_to(ROOT)} does not have an OOXML ZIP signature", errors)

    style_assets = sorted((ROOT / "assets" / "style-gallery").glob("[0-9][0-9]-*.png"))
    if len(style_assets) != 16:
        fail(f"expected 16 numbered style assets; found {len(style_assets)}", errors)
    for image in style_assets:
        if image.read_bytes()[:8] != b"\x89PNG\r\n\x1a\n":
            fail(f"{image.relative_to(ROOT)} does not have a PNG signature", errors)

    if errors:
        print("Repository validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Repository validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
