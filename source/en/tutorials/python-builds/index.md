---
{
  "title": "Python Engineering: pyproject, uv Locking, and Build Isolation",
  "description": "Separate runtime and build dependencies; diagnose installation through wheel compatibility and backend errors.",
  "layout": "post",
  "date": "2026-10-09 21:15:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/python-builds/",
  "tutorial": {
    "id": "T16",
    "group": "toolchain",
    "references": [
      "uv-config",
      "uv-build",
      "uv-lock",
      "lab-install"
    ]
  }
}
---

## Give project declarations separate responsibilities

`[build-system]` defines the backend and build dependencies. `[project]` declares distribution identity, Python support, and runtime dependencies. Optional dependencies define extras; scripts map installed commands to functions. A hyphenated distribution name can differ from an underscored import package.

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "example-tool"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = []

[project.scripts]
example-tool = "example_tool.cli:main"
```

This also needs an actual package and `main` function. A TOML entry alone does not establish a working CLI. Dependency ranges are not a complete reproducibility lock.

## Official-source supplement: locked and frozen differ

uv's `--locked` requires a current lockfile and fails if an update would be necessary. `--frozen` uses the existing lockfile without checking freshness. `uv sync` performs exact syncing by default and can remove packages not required by the lockfile. Use a dedicated project environment rather than applying an unknown lockfile to an important shared environment.

```bash
uv lock --check
uv sync --locked
uv run --locked example-tool
```

Run these in a prepared project's isolated environment. The cited documentation revision defines the behavior described here.

## Diagnose the smallest failing build

Without a compatible wheel, the installer may build a source distribution. Record Python, platform, index, package version, and the innermost backend error. `setuptools.build_meta:__legacy__` identifies a backend, not a unique cause. Isolated builds use their own dependencies; the interactive environment's setuptools need not be used.

Inspect compatible wheels, reproduce the single package in a new environment, and then constrain build dependencies or supply system tools based on evidence. Disable isolation for a specific package only when needed and provide its build dependencies yourself. It is not a universal repair.

## Isolate projects and validate installation

Isaac Lab, OpenPI, and LIBERO can require different Python, NumPy, framework, and graphics baselines. Follow each pinned installation and connect environments through interfaces. Check imports, CLI entry points, minimal computation, and lock consistency. An unresolved historical failure remains unverified; a candidate command is not reported as a successful fix.
