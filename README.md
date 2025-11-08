# cookMate — Frontend

This repository contains the frontend for cookMate, a recipe / cooking helper web application. The frontend is built with React + TypeScript and uses Vite as the dev tooling. It has been paired with a backend API (not included here).

---

## Screenshots

![Login screen — cookMate](./public/cookMate-login.png)

_Login page showing the email and password fields and primary CTA._

---

## Table of contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Backend](#backend)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License & contact](#license--contact)

---

## Highlights

- Fast development powered by Vite and TypeScript
- Tailwind CSS for utility-first styling
- React with hooks and react-router for routing
- Form handling with react-hook-form
- HTTP client: axios
- Toasts/notifications using Sonner
- Linting with ESLint

---

## Tech stack

- Framework: React (TypeScript)
- Tooling: Vite
- Styling: Tailwind CSS
- HTTP: axios
- Forms: react-hook-form
- Routing: react-router-dom
- Notifications: sonner
- Linting: ESLint
- Package manager: pnpm (pnpm-lock.yaml exists), npm or yarn also supported

Dependencies and devDependencies are listed in package.json.

---

## Getting started

Prerequisites:

- Node.js (recommended 18+)
- pnpm (recommended) or npm / yarn

Install dependencies:

Using pnpm (recommended):

```bash
pnpm install
```

Using npm:

```bash
npm install
```

Run development server:

```bash
pnpm dev
# or
npm run dev
```

Build for production:

```bash
pnpm build
# or
npm run build
```

Preview production build:

```bash
pnpm preview
# or
npm run preview
```

Run linter:

```bash
pnpm lint
# or
npm run lint
```

---

## Available scripts (from package.json)

- dev — start Vite dev server
- build — TypeScript build + Vite build
- lint — run ESLint across the project
- preview — preview the production build

---

## Environment variables

This project uses Vite, so environment variables exposed to the client must start with VITE\_. Example:

- VITE_API_URL=https://api.example.com

Create a `.env` or `.env.local` in the project root and add:

```
VITE_API_URL=https://your-backend.example
```

Then access with import.meta.env.VITE_API_URL in code.

---

## Project structure (top-level)

- index.html
- package.json
- pnpm-lock.yaml
- vite.config.ts
- tsconfig.json / tsconfig.\*.json
- eslint.config.js
- public/ — static assets
- src/ — application source code (components, pages, routes, styles, etc.)

(Adjust layout details inside src/ as needed for your app.)

---

## Backend

The backend for cookMate is in a separate repository:

- cookMate_backend: https://github.com/Meva1997/cookMate_backend

Description: RESTful API for a recipe app. Handles user authentication, recipe management, favorites, likes, and comments. Provides secure endpoints for creating, editing, and deleting recipes, as well as managing user profiles and interactions.

Set the frontend environment variable VITE_API_URL to point to the backend API base URL (for example, `https://api.example.com` or your local backend server).

---

## Development notes

- This project includes TypeScript configuration and ESLint. Keep types and lint rules up to date when adding new dependencies or patterns.
- Tailwind is configured; update tailwind config or design tokens in the src/styles area.
- Use react-router-dom for client-side routing and organize routes under src/pages or src/routes.
- For forms, prefer react-hook-form for performant form handling and validation.

---

## Contributing

Contributions are welcome:

- Open an issue to discuss a feature or bug.
- Fork the repo, create a feature branch, and submit a pull request.
- Keep commits small and focused; include descriptive PR titles and descriptions.
- Run and pass linting before submitting PRs.

---

## License & contact

No license file is included in this repository. If you want to add one, create a LICENSE file (e.g., MIT) at the project root.

Repository owner / contact:

- GitHub: https://github.com/Meva1997

---
