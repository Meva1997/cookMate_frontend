import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserRecipes from "./UserRecipes";
import UserFavorites from "./UserFavorites";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/CookMateAPI";
import Spinner from "../../components/Spinner";

export default function UserProfileView() {
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );

  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserById(userId!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const user = typeof data === "string" ? undefined : data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading user profile.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <section className="relative">
          <div
            className="w-32 h-32 rounded-full bg-cover bg-center shadow-lg"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfWDSNAtxWHxHrdZK_HhV79-xROcZcsNSqo-DwSj4XYP_rVQChKOLW30r68j9UQpxI9A7uMvTfmOCEudCqLFH7VcgHF9eyZm5c0vsbhNJOQls01VbO4fsqrDddMtFF6JhvUlAaC3NW4oqYvW5UaAXqHUxoJGFVTvTOhBzhK5-UgeI8sMBDTnvBkbWC4oXiCgkdAtST8lghM0J-_U8u5KwjIJdNExE_cfLlEJYdHUGRXH-SjhmbTAY0X-TRfceRUtD4D4yrkDmSIDQ')",
            }}
          />
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {typeof data === "string" ? data : data?.name ?? ""}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Chef and food enthusiast
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {typeof data === "string" ? data : data?.email ?? ""}
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            User Name: {typeof data === "string" ? data : data?.handle ?? ""}
          </p>
        </section>

        <nav className="flex gap-2">
          <Link
            to="/admin/create-recipe"
            className="px-5 py-2 rounded-lg bg-[#d2b48c]/20 dark:bg-[#d2b48c]/20 hover:bg-[#d2b48c]/30 dark:hover:bg-[#d2b48c]/30 text-[#d2b48c] font-bold text-sm transition-colors"
          >
            Create Recipe
          </Link>
          <Link
            to={`/admin/${userId}/edit`}
            className="px-5 py-2 rounded-lg bg-[#d2b48c]/20 dark:bg-[#d2b48c]/20 hover:bg-[#d2b48c]/30 dark:hover:bg-[#d2b48c]/30 text-[#d2b48c] font-bold text-sm transition-colors"
          >
            Edit profile
          </Link>
        </nav>

        <section className="mt-12 w-full">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <nav
              aria-label="Tabs"
              role="tablist"
              className="-mb-px flex space-x-8"
            >
              <button
                role="tab"
                aria-selected={activeTab === "recipes"}
                aria-controls="tab-recipes"
                onClick={() => setActiveTab("recipes")}
                className={
                  (activeTab === "recipes"
                    ? "border-primary text-primary border-b-2"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700") +
                  " whitespace-nowrap py-4 px-1 font-medium text-sm cursor-pointer"
                }
              >
                My recipes
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "favorites"}
                aria-controls="tab-favorites"
                onClick={() => setActiveTab("favorites")}
                className={
                  (activeTab === "favorites"
                    ? "border-primary text-primary border-b-2"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700") +
                  " whitespace-nowrap py-4 px-1 font-medium text-sm cursor-pointer"
                }
              >
                Favorites
              </button>
            </nav>
          </div>
        </section>
        <div
          className="w-full"
          id="tab-recipes"
          role="tabpanel"
          hidden={activeTab !== "recipes"}
        >
          {activeTab === "recipes" && <UserRecipes recipes={user?.recipes} />}
        </div>
      </div>

      <div
        className="w-full"
        id="tab-favorites"
        role="tabpanel"
        hidden={activeTab !== "favorites"}
      >
        {activeTab === "favorites" && (
          <UserFavorites favorites={user?.favorites} />
        )}
      </div>
    </>
  );
}
