#!/usr/bin/env python3
"""Validate a create-presentations delivery manifest without external calls."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROUTES = {
    "native_pptx",
    "visual_pptx",
    "hybrid_pptx",
    "html",
    "pdf",
    "google_slides",
}
STATUSES = {"pending", "generated", "passed", "needs_review", "accepted", "failed"}
SAMPLE_STATUSES = {"not-used", "pending", "accepted", "rejected"}
DELEGATION_MODES = {"not-used", "sequential", "parallel", "mixed"}
ROUTE_PROFILES = {
    "fast-native",
    "quality-native",
    "template-native",
    "visual-locked",
    "hybrid",
    "interactive-html",
    "google-native",
}
ROUTE_PROFILE_COMPATIBILITY = {
    "native_pptx": {"fast-native", "quality-native", "template-native"},
    "visual_pptx": {"visual-locked"},
    "hybrid_pptx": {"hybrid"},
    "html": {"interactive-html"},
    "pdf": ROUTE_PROFILES,
    "google_slides": {"google-native"},
}
EDITABILITY = {"editable", "partially-editable", "visual-locked", "source-editable"}
ROUTE_EDITABILITY = {
    "native_pptx": {"editable"},
    "visual_pptx": {"visual-locked"},
    "hybrid_pptx": {"partially-editable"},
    "html": {"source-editable", "visual-locked"},
    "pdf": {"visual-locked"},
    "google_slides": {"editable"},
}


def text(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate(payload: Any) -> list[str]:
    errors: list[str] = []
    if not isinstance(payload, dict):
        return ["manifest must be a JSON object"]
    if payload.get("schemaVersion") != "create-presentations-manifest-v1":
        errors.append("schemaVersion must be create-presentations-manifest-v1")
    if not text(payload.get("title")):
        errors.append("title must be a non-empty string")

    count = payload.get("slideCount")
    if not isinstance(count, int) or isinstance(count, bool) or not 1 <= count <= 500:
        errors.append("slideCount must be an integer from 1 to 500")

    routes = payload.get("routes")
    if not isinstance(routes, list) or not routes:
        errors.append("routes must be a non-empty array")
        routes = []
    else:
        invalid = sorted({route for route in routes if route not in ROUTES})
        if invalid:
            errors.append(f"unsupported routes: {', '.join(invalid)}")

    route_profiles = payload.get("routeProfiles")
    if route_profiles is not None:
        if not isinstance(route_profiles, dict):
            errors.append("routeProfiles must be an object")
        else:
            if set(route_profiles) != set(routes):
                errors.append("routeProfiles must map every requested route exactly once")
            for route, profile in route_profiles.items():
                if profile not in ROUTE_PROFILES:
                    errors.append(f"routeProfiles.{route} is unsupported")
                elif route in ROUTE_PROFILE_COMPATIBILITY and profile not in ROUTE_PROFILE_COMPATIBILITY[route]:
                    errors.append(f"routeProfiles.{route} is incompatible with route {route}")

    cost = payload.get("cost")
    if cost is not None:
        if not isinstance(cost, dict):
            errors.append("cost must be an object")
        else:
            actual = cost.get("actual")
            limit = cost.get("hardLimit")
            if not isinstance(actual, (int, float)) or isinstance(actual, bool) or actual < 0:
                errors.append("cost.actual must be a non-negative number")
            if not isinstance(limit, (int, float)) or isinstance(limit, bool) or limit <= 0:
                errors.append("cost.hardLimit must be a positive number")
            if isinstance(actual, (int, float)) and isinstance(limit, (int, float)) and actual > limit:
                errors.append("cost.actual exceeds cost.hardLimit")

    production = payload.get("production")
    selected_backend: str | None = None
    sample_slide_id: str | None = None
    if production is not None:
        if not isinstance(production, dict):
            errors.append("production must be an object")
        else:
            selected_backend = production.get("selectedBackend")
            if not text(selected_backend):
                errors.append("production.selectedBackend must be a non-empty string")
                selected_backend = None
            sample_status = production.get("sampleStatus")
            if sample_status not in SAMPLE_STATUSES:
                errors.append("production.sampleStatus is unsupported")
            sample_slide_id = production.get("sampleSlideId")
            if sample_slide_id is not None and not text(sample_slide_id):
                errors.append("production.sampleSlideId must be a non-empty string when provided")
                sample_slide_id = None
            if sample_status == "accepted" and sample_slide_id is None:
                errors.append("production.sampleSlideId is required for an accepted sample")
            delegation = production.get("delegation")
            if delegation not in DELEGATION_MODES:
                errors.append("production.delegation is unsupported")

    slides = payload.get("slides")
    if not isinstance(slides, list):
        errors.append("slides must be an array")
        slides = []
    elif isinstance(count, int) and len(slides) != count:
        errors.append("slides must contain exactly slideCount entries")

    ids: set[str] = set()
    for index, slide in enumerate(slides):
        if not isinstance(slide, dict):
            errors.append(f"slides[{index}] must be an object")
            continue
        slide_id = slide.get("id")
        if not text(slide_id):
            errors.append(f"slides[{index}].id must be a non-empty string")
        elif slide_id in ids:
            errors.append(f"slides[{index}].id must be unique")
        else:
            ids.add(slide_id)
        if slide.get("status") not in STATUSES:
            errors.append(f"slides[{index}].status is unsupported")
        attempts = slide.get("attempts")
        if not isinstance(attempts, int) or isinstance(attempts, bool) or attempts < 0:
            errors.append(f"slides[{index}].attempts must be a non-negative integer")
        backend = slide.get("backend")
        if backend is not None and not text(backend):
            errors.append(f"slides[{index}].backend must be a non-empty string when provided")
        if selected_backend and slide.get("status") in {"generated", "passed", "accepted"}:
            if not text(backend):
                errors.append(f"slides[{index}].backend is required for completed production")
            elif backend != selected_backend:
                errors.append(f"slides[{index}].backend must match production.selectedBackend")
        for key in ("promptRecord", "qaEvidence"):
            if slide.get(key) is not None and not text(slide.get(key)):
                errors.append(f"slides[{index}].{key} must be a non-empty string when provided")

    if sample_slide_id is not None and sample_slide_id not in ids:
        errors.append("production.sampleSlideId must match a slide id")

    outputs = payload.get("outputs")
    if not isinstance(outputs, list) or not outputs:
        errors.append("outputs must be a non-empty array")
        outputs = []
    output_routes: set[str] = set()
    for index, output in enumerate(outputs):
        if not isinstance(output, dict):
            errors.append(f"outputs[{index}] must be an object")
            continue
        route = output.get("route")
        if route not in ROUTES:
            errors.append(f"outputs[{index}].route is unsupported")
        else:
            output_routes.add(route)
        for key in ("path", "sha256"):
            if not text(output.get(key)):
                errors.append(f"outputs[{index}].{key} must be a non-empty string")
        size = output.get("byteSize")
        if not isinstance(size, int) or isinstance(size, bool) or size <= 0:
            errors.append(f"outputs[{index}].byteSize must be a positive integer")
        editability = output.get("editability")
        if editability is not None:
            if editability not in EDITABILITY:
                errors.append(f"outputs[{index}].editability is unsupported")
            elif route in ROUTE_EDITABILITY and editability not in ROUTE_EDITABILITY[route]:
                errors.append(f"outputs[{index}].editability is incompatible with route {route}")

    missing = sorted(set(routes) - output_routes)
    if missing:
        errors.append(f"outputs missing requested routes: {', '.join(missing)}")
    return errors


def self_test() -> int:
    valid = {
        "schemaVersion": "create-presentations-manifest-v1",
        "title": "Demo",
        "slideCount": 1,
        "routes": ["visual_pptx"],
        "routeProfiles": {"visual_pptx": "visual-locked"},
        "models": {"planning": "any", "image": "any"},
        "cost": {"currency": "USD", "actual": 0.2, "hardLimit": 10},
        "production": {
            "selectedBackend": "built-in-image-tool",
            "sampleStatus": "accepted",
            "sampleSlideId": "slide-01",
            "delegation": "not-used",
        },
        "slides": [
            {
                "id": "slide-01",
                "status": "accepted",
                "attempts": 1,
                "backend": "built-in-image-tool",
                "promptRecord": "prompts/slide-01.json",
                "qaEvidence": "renders/slide-01.png",
            }
        ],
        "outputs": [
            {
                "route": "visual_pptx",
                "path": "demo.pptx",
                "sha256": "abc",
                "byteSize": 42,
                "editability": "visual-locked",
            }
        ],
    }
    invalid = dict(valid)
    invalid["cost"] = {"currency": "USD", "actual": 12, "hardLimit": 10}
    mismatch = json.loads(json.dumps(valid))
    mismatch["slides"][0]["backend"] = "different-backend"
    missing_sample = json.loads(json.dumps(valid))
    missing_sample["production"]["sampleSlideId"] = "slide-99"
    wrong_profile = json.loads(json.dumps(valid))
    wrong_profile["routeProfiles"]["visual_pptx"] = "fast-native"
    false_editability = json.loads(json.dumps(valid))
    false_editability["outputs"][0]["editability"] = "editable"
    if validate(valid):
        print("self-test failed: valid fixture rejected", file=sys.stderr)
        return 1
    if not validate(invalid):
        print("self-test failed: invalid fixture accepted", file=sys.stderr)
        return 1
    if not validate(mismatch):
        print("self-test failed: backend mismatch accepted", file=sys.stderr)
        return 1
    if not validate(missing_sample):
        print("self-test failed: unknown sample slide accepted", file=sys.stderr)
        return 1
    if not validate(wrong_profile):
        print("self-test failed: incompatible route profile accepted", file=sys.stderr)
        return 1
    if not validate(false_editability):
        print("self-test failed: false editability claim accepted", file=sys.stderr)
        return 1
    print("self-test passed")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", nargs="?")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    if not args.manifest:
        parser.error("manifest is required unless --self-test is used")
    try:
        payload = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"invalid manifest input: {exc}", file=sys.stderr)
        return 2
    errors = validate(payload)
    if errors:
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("deck manifest is valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
