# Maintenance log

## 2026-09-27 — Registration boundary and continuous validation

### Rationale

The frontend bootstrap, the complete rendered application and the WhatsApp registration-message rules all lived in `client/src/main.jsx`. The registration behavior therefore could not be tested without loading the entire browser UI, and the repository had no automated pull-request validation to catch message-format or build regressions.

### Files changed

- `client/src/main.jsx` — reduced the entry point to React application mounting.
- `client/src/App.jsx` — moved the existing rendered application into its own module, delegated registration URL creation and removed unused icon imports.
- `client/src/registration.mjs` — isolated registration defaults, message formatting and WhatsApp URL construction as pure functions.
- `client/src/registration.test.mjs` — added focused tests for defaults, complete messages, optional messages and URL encoding.
- `client/package.json` and `package.json` — added test and combined validation commands.
- `.github/workflows/ci.yml` — added read-only validation for pull requests and `main`.
- `README.md` — documented the module boundaries and validation workflow.
- `.github/maintenance-log.md` — recorded this maintenance work.

### Validation

- Ran `npm test`: four registration tests passed.
- Ran `npm run build`: the Vite production build completed successfully.
- Ran `npm run check` from the repository root.
- Ran `npm audit --prefix client --audit-level=high`; npm reported zero vulnerabilities.
- Parsed both package manifests and the workflow YAML.
- Ran `git diff --check` and reviewed the complete diff.
- Browser-plugin validation was unavailable, and the isolated Playwright browser download was blocked by the execution network; the change is therefore covered by pure behavior tests, the production build and hosted CI.

### Risk

Low. The rendered markup and styling are unchanged. The extracted pure function preserves the existing message text, default values, target number, URL encoding and new-tab behavior.

### Rollback

Revert the pull request's squash commit to restore the single-file entry point and remove the new validation workflow.

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
