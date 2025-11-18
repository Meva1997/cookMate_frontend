import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { getUserProfileData } from "../api/CookMateAPI";
import type { UserLoggedIn } from "../types";
import Logo from "../components/Logo";

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
              <Logo className="h-8 w-8 text-green-950/80 dark:text-[#c9ad80]" />
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
                    className="dark:bg-[#c9ad80] bg-green-950/80 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 dark:text-black"
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
