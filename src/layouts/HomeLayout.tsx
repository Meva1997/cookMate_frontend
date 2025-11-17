import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { getUserProfileData } from "../api/CookMateAPI";
import type { UserLoggedIn } from "../types";

export default function HomeLayout() {
  const { data } = useQuery<UserLoggedIn>({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (data)
    return (
      <div className="flex flex-col min-h-screen bg-gray-300/40  dark:bg-black font-display  dark:text-white">
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-white dark:bg-black">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <svg
                className="h-8 w-8 text-[#19e6a2] dark:text-[#c9ad80]"
                viewBox="0 0 48 48"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6Z"
                  opacity="0.15"
                />
                <path d="M22 28V36H26V28H32L24 19L16 28H22Z" />
                <path d="M24 12C22.3431 12 21 13.3431 21 15C21 16.6569 22.3431 18 24 18C25.6569 18 27 16.6569 27 15C27 13.3431 25.6569 12 24 12Z" />
              </svg>
              <Link to="/home">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  CookMate
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {data.id ? (
                <>
                  <Link
                    to={`/admin/${data.id}`}
                    className="font-medium hover:underline"
                  >
                    {data.handle}
                  </Link>
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://picsum.photos/seed/avatar/200')",
                    }}
                  />
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="dark:bg-[#c9ad80] bg-[#19e6a2] text-white px-4 py-2 rounded-md font-medium hover:opacity-90 dark:text-black"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>

        <main className=" grow container mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    );
}
