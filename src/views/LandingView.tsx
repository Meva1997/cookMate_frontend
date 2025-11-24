import { Link } from "react-router-dom";

export default function LandingView() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <section className="bg-white dark:bg-[#0b1220] rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-900 dark:text-[#d2b48c]">
          Welcome to CookMate
        </h1>
        <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
          This project is a personal portfolio application that demonstrates a
          modern full‑stack recipe app built with TypeScript, React, and Node.
          It showcases frontend best practices, a modular architecture, and
          examples of CRUD operations, image uploads, and user authentication.
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Key Features
          </h2>
          <ul className="mt-3 list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>Responsive recipe grid and detail pages</li>
            <li>Image uploads via Cloudinary</li>
            <li>
              Data fetching with <code>@tanstack/react-query</code> to consume
              the REST API
            </li>
            <li>User authentication and protected routes</li>
            <li>Favorites, likes, and comments with optimistic updates</li>
            <li>Reusable recipe create / edit form</li>
            <li>Dark mode and mobile‑first design</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Tech Stack
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            React + Vite, TypeScript, Tailwind CSS, Express, MongoDB,
            Cloudinary, @tanstack/react-query. Built as a personal portfolio
            project to demonstrate full‑stack skills.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-slate-800 dark:text-white">
              Contact
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Linkedin:{" "}
              <a
                className="underline"
                href="https://www.linkedin.com/in/alex-fullstack-developer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alejandro Medina Full Stack Developer
              </a>
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Email:{" "}
              <a className="underline" href="mailto:alexmedval2@gmail.com">
                alexmedval2@gmail.com
              </a>
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              GitHub:{" "}
              <a
                className="underline"
                href="https://github.com/Meva1997"
                target="_blank"
                rel="noreferrer"
              >
                Meva1997
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="inline-block px-5 py-2 rounded-md bg-green-950/80 text-white font-semibold hover:bg-green-950 transition"
            >
              Enter the App
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          This is a personal, non‑commercial project created to showcase my
          skills. Content or images may be illustrative and used for demo
          purposes only.
        </p>
      </section>
    </main>
  );
}
