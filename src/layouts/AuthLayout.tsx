import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-300 dark:bg-black font-display text-[#1f2937] dark:text-gray-300">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-white dark:bg-gray-800/40 shadow-lg md:grid md:grid-cols-2">
        <div className="relative hidden h-full md:block">
          <img
            alt="A variety of delicious food ingredients"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeUZqplYKAChKX_V_C_HZ8arp43FAE2v8SXIlXxVCpW11WNTYh0lylNwGTgS6I8jsi9WOyeojVK2Fsc1xZA-du1LmRU52bkRgGmVts4X7wlxNMHjjnCOz9TlbOG33YaiubJ8KC0Po68neaBnF3NzzfCi_YxpRZ52TLnUNI4NZxBS5kpEdEfRsTj1v88cvJgVvC7SKzNx0PAL9DIaVtdc7See2KG8T6G2I04-U34hC_y4gMK3chS6sGDlERwzyFh3XvNH5bWiH83E0"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex flex-col justify-center bg-background-light dark:bg-background-dark p-8 sm:p-12">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {/* shared logo */}
              <Logo />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-green-900">
                CookMate
              </h1>
            </div>
            <p className="text-gray-600 dark:text-white">
              Welcome! Please enter your details.
            </p>
          </div>

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
