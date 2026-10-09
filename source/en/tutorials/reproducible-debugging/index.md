---
{
  "title": "Reproducible Debugging: Git, Downloads, ABI, and Evidence States",
  "description": "Locate installation, network, extension, and runtime failures by layer and sanitize evidence.",
  "layout": "post",
  "date": "2026-10-09 21:17:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/reproducible-debugging/",
  "tutorial": {
    "id": "T18",
    "group": "toolchain",
    "references": [
      "git-submodule",
      "hf-download",
      "uv-build",
      "usd-glossary"
    ]
  }
}
---

## Let the failing layer guide the next check

| Symptom | First inspection | What it does not establish |
|---|---|---|
| Missing system library | Distribution, package source, ABI | Compatibility from a similar name |
| AppImage/FUSE failure | Mounting versus graphics runtime | A fully working extracted app |
| Python build failure | Single-package backend stderr | A fix through upgrading everything |
| HTTP 401/403 | Resource rights, identity, license | A necessarily dead URL |
| TLS/registry failure | Domain, certificate, proxy, stage | A GPU or physics cause |
| Callback argument error | Registration and signature | Compatibility from an arbitrary edit |
| USD shader/codegen failure | Definitions, resources, generation | Success from setting one variable |

Distribution ABI, MoviePy/Pillow APIs, and encoded video FPS remain version-specific. An `XID` in a network-driver log is not automatically an NVIDIA `NVRM: Xid`; identify the subsystem first.

## Official Git supplement: registration belongs to the parent

```bash
git rev-parse HEAD
git submodule status --recursive
git config --file .gitmodules --get-regexp path
```

The last command fails if `.gitmodules` is absent, providing a registration clue. Initialize only confirmed paths. Save both parent and dependency revisions. Vendor directories, submodules, and LFS pointers are different mechanisms; a pointer does not establish downloaded binary content.

## Official download supplement

Hugging Face documentation supports fixed `revision` values and version-aware caching. Record public resource IDs, revisions, hashes, and licenses. Keep signed URLs, tokens, and credential-bearing proxy addresses out of public material. Do not copy returned private cache paths into a tutorial or mutate cached files as though they were independent working copies.

## Write a reusable incident record

Use symptom, minimal reproduction, versions, essential error, evidence, one change, matched recheck, and remaining conditions. Replace account paths with relative paths and private hosts with `localhost` or documentation domains. Remove contacts, authentication headers, device identifiers, and personal timelines. Do not publish unsanitized archives or chat exports.

| Status | Supported claim |
|---|---|
| Documentation checked | A pinned source describes the mechanism |
| Static check | Inspected structural conditions hold |
| Minimal run | Specified input/environment passed |
| Integration accepted | Assets, sensing, and control run together |
| Proposed | No execution loop completed |

Historical personal incidents are generalized into methods; private devices were not rerun and their snapshots are not published. Continue with the [evaluation protocol](../../knowledge/evaluation-protocol/). Commands require the relevant tools and matching versions.
