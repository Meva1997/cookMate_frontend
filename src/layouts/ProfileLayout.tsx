import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";
import FooterInfo from "../components/FooterInfo";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black font-display text-slate-800 dark:text-slate-200">
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-white dark:bg-black mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Logo />
              <Link to="/home">
                <h2 className="text-2xl font-bold text-black dark:text-green-900">
                  CookMate
                </h2>
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
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
        <FooterInfo />
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
