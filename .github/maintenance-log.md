# Maintenance log

## 2026-09-21 — Reproducible frontend dependencies

### Rationale

The frontend declared every dependency as `latest` and had no lockfile. Fresh local and deployment installs could therefore resolve different React, Vite, plugin, and icon versions without any repository change, making builds difficult to reproduce and exposing the project to unreviewed major-version upgrades.

### Files changed

- `client/package.json` — replaced floating dependency tags with the exact resolved versions and documented the Node.js versions required by Vite.
- `client/package-lock.json` — locked the complete dependency graph for deterministic installs.
- `package.json` — changed the repository install helper to `npm ci` and documented the same Node.js requirement.
- `README.md` — updated local setup to use the lockfile through `npm ci`.
- `.gitignore` — excluded dependency folders, build output, logs, and local operating-system metadata.
- `.github/maintenance-log.md` — recorded this maintenance work.

### Validation

- Removed the installed dependency directory and ran a clean `npm ci` from `client/`.
- Ran the root `npm run install-all` reproducible-install helper.
- Ran `npm run build` from the repository root.
- Ran `npm audit --audit-level=high`; npm reported zero vulnerabilities.
- Parsed both manifests and the generated lockfile as JSON.
- Ran `git diff --check` and reviewed the complete diff.

### Risk

Low. The exact versions are the same versions resolved from the repository's existing `latest` declarations during this maintenance run. Application source and runtime behavior are unchanged.

### Rollback

Revert the pull request's squash commit to restore floating dependency resolution and remove the lockfile.
