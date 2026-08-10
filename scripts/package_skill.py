#!/usr/bin/env python3
"""Create a release ZIP containing only the installable Skill folder."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "create-presentations"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", default="dev")
    parser.add_argument("--output-dir", default=str(ROOT / "dist"))
    args = parser.parse_args()

    output = Path(args.output_dir).expanduser().resolve()
    output.mkdir(parents=True, exist_ok=True)
    archive_base = output / f"create-presentations-skill-{args.version}"
    archive = shutil.make_archive(
        str(archive_base),
        "zip",
        root_dir=SKILL.parent,
        base_dir=SKILL.name,
    )
    print(archive)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
