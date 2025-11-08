import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

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
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
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
