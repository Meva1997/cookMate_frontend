import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { getUserImageById, getUserProfileData } from "../api/CookMateAPI";
import type { UserLoggedIn } from "../types";
import Logo from "../components/Logo";
import { Toaster } from "sonner";
import FooterInfo from "../components/FooterInfo";
import Spinner from "../components/Spinner";
import ErrorBoundary from "../components/ErrorBoundary";

export default function HomeLayout() {
  const {
    data,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery<UserLoggedIn>({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: imageUrl } = useQuery({
    queryKey: ["userImage", data?.id],
    queryFn: () => getUserImageById(data!.id),
    enabled: !!data?.id,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-black font-display dark:text-white">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white dark:bg-black">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-8 w-8 text-green-950/80 dark:text-white" />
            <Link to="/home">
              <h1 className="text-2xl font-bold text-black dark:text-green-900">
                CookMate
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {data?.id ? (
              <>
                <Link
                  to={`/admin/${data.id}`}
                  className="font-black hover:underline text-xl dark:text-green-900"
                >
                  {data.handle}
                </Link>
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      imageUrl?.imageUrl ??
                      "https://picsum.photos/seed/avatar/200"
                    })`,
                  }}
                />
              </>
            ) : (
              <Link
                to="/auth/login"
                className="dark:bg-[#c9ad80] bg-green-950/80 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 dark:text-black"
              >
                Log In
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Error banner: visible when profile request fails */}
      {isProfileError && (
        <div className="bg-red-100 text-red-800 border-t border-b border-red-200 py-2">
          <div className="container mx-auto px-6 text-sm">
            Error loading user profile — the app will continue in limited mode.
          </div>
        </div>
      )}

      <main className="grow container mx-auto px-6 py-8 relative">
        {/* overlay spinner while profile is loading, but still render children */}
        {isProfileLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/60">
            <Spinner />
          </div>
        )}

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <FooterInfo />

      <Toaster position="top-right" richColors />
    </div>
  );
}
