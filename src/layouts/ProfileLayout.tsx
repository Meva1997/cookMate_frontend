import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8f7] dark:bg-black font-display text-slate-800 dark:text-slate-200">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-white dark:bg-black">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <svg
                className="h-8 w-8 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.45 4.08 10.92 4.21 10.41L9 15.2V19.5C9 19.67 9.09 19.83 9.24 19.92L11 20.93V19.93ZM17.79 10.41C17.92 10.92 18 11.45 18 12C18 16.08 14.95 19.44 11 19.93V16L17.55 9.45C17.89 9.79 17.79 10.41 17.79 10.41Z M12 4C12.55 4 13.08 4.08 13.59 4.21L8.8 9H4.5C4.33 9 4.17 8.91 4.08 8.76C4.03 8.67 4 8.59 4 8.5C4 6.04 5.96 4 8.5 4H12ZM19.92 8.76C19.83 8.91 19.67 9 19.5 9H15.2L10.41 4.21C10.92 4.08 11.45 4 12 4H15.5C17.96 4 19.96 6.04 20 8.5C20 8.59 19.97 8.67 19.92 8.76Z" />
              </svg>
              <Link to="/home">
                <h2 className="text-2xl font-bold text-white">CookMate</h2>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                className="text-md font-medium text-slate-600 dark:text-white transition-colors"
                to="/home"
              >
                Home
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/admin">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-offset-2 ring-offset-[#fdfcfa] dark:ring-offset-[#1f1f1f] ring-[#d2b48c]/50"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvmjjKQ7Z1trUWJ4RVTwuzbD_rKDiHpDz3rI4Zi-sk78BIVD8GOqwgL_dMQYYw-EsmTaPa5Oe8pJuRv105uaTzgorBEyxyRuLKHYZyzjkKRFo3Sb45qTCQymYDT-gvIO5VqSL_dkLMv0BU1o3b5A3y6W2jTMMJdA7Evxx1l6VrKkK3F9EyuHPQA7fNwuzMEAWFlaGmDq0IEAbq_i1eRQUmYUWHh6P0quJtWz_NHV0TegkNjqgKHhTfb_1DlnE-qEqMv7baN-isLkM')",
                }}
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
