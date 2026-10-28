# Maintenance log

## 2026-10-28 — Expose and dismiss the mobile navigation accessibly

### Rationale

The mobile menu button used a fixed “Toggle navigation menu” label and did not
expose its expanded state or the navigation it controlled. Keyboard users also
could not dismiss an open menu with Escape and return focus to its toggle. The
menu now publishes synchronized semantics and supports conventional Escape
dismissal without changing the existing navigation destinations or design.

### Files changed

- `client/src/App.jsx` — connects the toggle to the primary navigation,
  synchronizes its accessible label and expanded state, and installs scoped
  Escape handling while the menu is open.
- `client/src/navigation.mjs` — isolates the Escape-key behavior.
- `client/src/navigation.test.mjs` — covers the ARIA contract, ignored keys,
  menu closure, and focus restoration.
- `README.md` — documents the navigation boundary and validation coverage.
- `.github/maintenance-log.md` — records this maintenance work.

### Validation

- `npm run install-all`
- `npm run check`
- `git diff --check`
- Reviewed the complete diff for keyboard behavior, accessibility, responsive
  layout, security, backward compatibility, and the existing visual direction.

### Risk

Low. Pointer and touch toggling, link destinations, menu styling, and desktop
navigation are unchanged. The new listener exists only while the menu is open
and is removed when it closes or the component unmounts.

### Rollback

Revert the pull request's squash commit to restore the fixed toggle label and
remove Escape dismissal, the navigation helper, and its regression tests.

## 2026-10-23 — Make clipboard feedback reliable

### Rationale

Payment and donation copy failures were caught but stored in a value that neither button rendered, so users received no actionable feedback when clipboard permission was unavailable. Overlapping copy attempts could also let an older asynchronous result or timer replace or clear the newest message.

### Files changed

- `client/src/clipboard.mjs` — adds a dependency-free Clipboard API boundary with feature detection, latest-request ownership, timed feedback, and lifecycle cleanup.
- `client/src/clipboard.test.mjs` — covers successful copies, unavailable and rejected clipboard writes, overlapping attempts, cleanup, and button-label selection.
- `client/src/App.jsx` — uses the clipboard controller for both account controls and exposes success or manual-copy guidance through polite live feedback.
- `README.md` — documents the clipboard boundary and expanded isolated test coverage.
- `.github/maintenance-log.md` — records this maintenance work.

### Validation

- `npm run check` — 14/14 automated tests passed and the Vite production build completed in GitHub Actions.
- Re-read the complete diff for repository conventions, accessibility, security, backwards compatibility, and scope.
- Confirmed the change does not alter account details, registration behavior, external links, dependencies, or deployment configuration.

### Risk

Low. The change is limited to local copy-button feedback and a dependency-free controller. Account details remain rendered for manual selection if the browser denies clipboard access.

### Rollback

Revert this pull request to restore the previous inline Clipboard API handler and button labels.

## 2026-10-18 — Replace migration notes with a repository guide

### Rationale

The root README described the site mainly as a list of changes from an older version. It did not provide the complete root-level setup and command workflow, explain the WhatsApp-only registration data boundary, index the current files, or give contributors deployment and content-maintenance safeguards.

### Files changed

- `README.md` — documents the verified product surface, requirements, root command wrappers, registration privacy boundary, architecture, validation, deployment, and contribution expectations.
- `.github/maintenance-log.md` — records this documentation maintenance work.

### Validation

- Compared every command with the root and client package manifests.
- Compared the registration fields and handoff behavior with `client/src/registration.mjs` and `client/src/App.jsx`.
- Compared the architecture table with the committed repository tree.
- Verified the documented CI and Vercel settings against `.github/workflows/ci.yml` and the client build layout.
- Reviewed all relative paths and the complete diff for accuracy, privacy, security, accessibility guidance, backward compatibility, and project scope.
- The pull request CI run is the authoritative clean-branch test and production-build validation.

### Risk

Low. This changes documentation only. Application source, public content, contact details, payment details, dependencies, build behavior, and deployment configuration are unchanged.

### Rollback

Revert this pull request to restore the previous README and maintenance-log state.

## 2026-10-11 — Keep page content visible across motion preferences

### Rationale

Every major section started transparent and depended on `IntersectionObserver`
to become visible. Browsers without that API could therefore show an almost
blank page. Visitors requesting reduced motion still received smooth scrolling,
entrance transitions and a continuously floating logo.

### Files changed

- `client/src/reveal.mjs` — added a tested reveal boundary with reduced-motion and unsupported-browser fallbacks.
- `client/src/App.jsx` — delegates reveal setup and cleanup to the shared boundary.
- `client/src/style.css` — disables smooth scrolling and non-essential motion when requested.
- `client/src/reveal.test.mjs` — covers immediate and observer-driven reveal paths.
- `client/package.json`, `README.md` and `.github/maintenance-log.md` — include the new validation and maintenance record.

### Validation

- Ran all nine Node.js tests.
- Ran the Vite production build.
- Ran the complete `npm run check` gate.
- Ran `git diff --check` and reviewed the complete diff for accessibility,
  mobile behavior, security, compatibility and the existing visual direction.

### Risk

Low. The existing scroll-triggered presentation remains unchanged for visitors
without a reduced-motion preference. The fallback only makes already-rendered
content immediately visible and does not change copy, navigation, registration,
contact destinations or deployment behavior.

### Rollback

Revert the pull request's squash commit to restore the observer-only reveal
path and the previous motion behavior.

## 2026-10-06 — Validate WhatsApp registration details

### Rationale

HTML `required` validation accepts whitespace-only text. A visitor could
therefore open WhatsApp with a blank-looking name or phone number, and valid
details retained accidental surrounding spaces in the generated enquiry.

### Files changed

- `client/src/registration.mjs` — added reusable normalization and required-field validation.
- `client/src/App.jsx` — reports native field errors, submits normalized details and announces successful WhatsApp handoff.
- `client/src/registration.test.mjs` — added regression coverage for blank and padded inputs.
- `README.md` — documented the expanded registration boundary.
- `.github/maintenance-log.md` — recorded this maintenance work.

### Validation

- Ran all six registration tests.
- Ran the Vite production build.
- Ran the complete `npm run check` gate in hosted CI.
- Reviewed the full diff for security, accessibility, mobile behavior and backward compatibility.

### Risk

Low. Valid enquiries keep the existing WhatsApp number, message fields and
new-tab behavior. Only whitespace-only required values are blocked, surrounding
spaces are removed, and the existing success message gains status semantics.

### Rollback

Revert the pull request's squash commit to restore the previous form behavior
and four-test registration suite.

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
