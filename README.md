# Daar El-Mahfouz Website

Frontend-only React + Vite website for Daar El-Mahfouz for Da'wah and Islamic Scholarship.

## What changed in this version

- Full institutional restructuring
- No server folder
- No MongoDB
- No backend
- WhatsApp registration with pre-filled student details
- Expanded sections for mission, vision, programmes, coaching, schedule, tuition, da'wah services, donations and contact
- Founder section left intentionally blank for later content

## Local development

```bash
cd client
npm ci
npm run dev
```

The committed lockfile and exact dependency versions keep local and deployment installs reproducible. Use Node.js `^20.19.0` or `>=22.12.0`, as required by the pinned Vite release.

## Architecture

- `client/src/main.jsx` only mounts the React application.
- `client/src/App.jsx` owns the rendered website and browser interactions.
- `client/src/registration.mjs` owns registration defaults, required-field validation, normalization, message formatting and the WhatsApp URL.
- `client/src/registration.test.mjs` protects the registration contract without requiring a browser or live WhatsApp session.

## Validation

From the repository root:

```bash
npm run check
```

This runs the registration tests followed by the production build. Pull requests and changes to `main` run the same command in GitHub Actions.

## Deploy on Vercel

Root directory should be:

```txt
client
```

Build command:

```bash
npm run build
```

Output directory:

```txt
dist
```
