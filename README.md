# Daar El-Mahfouz Website

A frontend-only institutional website for Daar El-Mahfouz for Da’wah and Islamic Scholarship. The React and Vite application presents the institution’s programmes, schedules, tuition, da’wah services, donation details, and contact information, then hands registration enquiries to WhatsApp.

There is no backend, database, account system, analytics integration, or runtime environment configuration in this repository.

## Product surface

- Qur’an, Arabic, Islamic Studies, and academic-coaching programme information
- Learner groups, teaching modes, schedules, tuition, and examination targets
- Da’wah and educational services
- Donation and institutional contact details
- Responsive navigation and section-reveal effects
- A registration form that validates required details and opens a prefilled WhatsApp enquiry
- Reduced-motion and unsupported-browser fallbacks that keep all content visible

The founder section remains intentionally reserved for approved content.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- A modern browser

The Node.js range matches the pinned Vite release. Dependencies are locked in `client/package-lock.json`.

## Local development

Clone the repository and use the root command wrappers:

```bash
git clone https://github.com/gojocodes-all/daar-el-mahfouz-site.git
cd daar-el-mahfouz-site
npm run install-all
npm run dev
```

The development server listens on all interfaces and prints its local URL. No `.env` file or external service is required.

## Commands

Run these from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run install-all` | Install the locked frontend dependency graph with `npm ci` |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run the dependency-free registration and reveal tests |
| `npm run build` | Create the production site in `client/dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Run the complete test and production-build gate |

Pull requests and pushes to `main` run `npm run check` in GitHub Actions with read-only repository permissions.

## Registration and data boundary

The registration form collects the prospective learner’s name, phone number, category, programme, current level, preferred teaching mode, preferred schedule, examination target, and optional message.

Name and phone are required. The browser trims the submitted values, builds a WhatsApp message, and opens `wa.me` in a new tab. The application does not send the form to this repository, a custom API, or a database. After the handoff, WhatsApp’s own terms and privacy practices apply.

When changing the form, keep `createInitialRegistrationForm`, `prepareRegistrationForm`, and `buildRegistrationMessage` synchronized, and update the focused tests.

## Architecture

| Path | Responsibility |
| --- | --- |
| `package.json` | Root command wrappers and supported Node.js versions |
| `client/index.html` | Page metadata and React mount point |
| `client/src/main.jsx` | React application bootstrap |
| `client/src/App.jsx` | Institutional content and browser interactions |
| `client/src/clipboard.mjs` | Race-safe Clipboard API adapter and transient success/failure feedback |
| `client/src/registration.mjs` | Registration defaults, validation, normalization, message formatting, and WhatsApp URL |
| `client/src/reveal.mjs` | Progressive reveal with reduced-motion and unsupported-browser fallbacks |
| `client/src/*.test.mjs` | Node.js regression tests for clipboard, registration, and reveal behavior |
| `client/src/style.css` | Responsive layout, typography, components, and motion styles |
| `client/src/assets/` | Institution logo, flyers, and contact artwork |
| `.github/workflows/ci.yml` | Hosted test and production-build validation |
| `.github/maintenance-log.md` | Dated maintenance rationale, validation, risk, and rollback notes |

## Validation

Before opening a pull request, install from the lockfile and run the same gate used by CI:

```bash
npm run install-all
npm run check
```

For content or layout changes, also inspect the site manually at desktop and mobile widths. Verify navigation, registration validation, the WhatsApp message preview, copy controls, keyboard focus, and reduced-motion behavior.

Tests inject clipboard and reveal doubles and do not contact WhatsApp or any other external service.

## Deployment

The repository is configured as a Vercel project whose root directory is `client`:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

For another static host, build from `client/` and publish `client/dist/`. No server process, secret, or environment variable is required.

## Contributing

Keep changes aligned with the existing institutional content and visual direction. Do not invent staff biographies, programme claims, schedules, prices, payment details, or outcomes.

Before merging:

1. Keep public contact, schedule, tuition, and bank information consistent wherever it appears.
2. Add or update focused tests when registration or reveal behavior changes.
3. Avoid adding a backend or collecting enquiry data unless the product requirements, privacy notice, security controls, and deployment plan are explicitly approved.
4. Run `npm run check` and manually review affected responsive states.
5. Add a dated entry to `.github/maintenance-log.md` with the rationale, files changed, validation, risk, and rollback.
