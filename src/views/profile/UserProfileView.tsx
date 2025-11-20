import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserRecipes from "./UserRecipes";
import UserFavorites from "./UserFavorites";
import ProfileImageUploader from "../../components/ProfileImageUploader";
import { useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserImageById,
  getUserProfileData,
} from "../../api/CookMateAPI";
import Spinner from "../../components/Spinner";
import LogoutButton from "../../components/LogoutButton";
import type { UserLoggedIn } from "../../types";

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

  //fetch current logged in user data
  const { data: meData } = useQuery<UserLoggedIn>({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: userImageData } = useQuery({
    queryKey: ["userImage", userId],
    queryFn: () => getUserImageById(userId!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const currentUser = meData?.id === userId;

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
          {/* Replace avatar div with ProfileImageUploader to allow owner to upload */}
          <ProfileImageUploader
            userId={userId!}
            imageUrl={
              userImageData?.imageUrl
                ? userImageData.imageUrl
                : "https://picsum.photos/seed/avatar/200"
            }
            isOwner={currentUser}
          />
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {typeof data === "string" ? data : data?.name ?? ""}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {typeof data === "string"
              ? data
              : data?.description ?? "No description available yet..."}
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {typeof data === "string" ? data : data?.email ?? ""}
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            User Name: {typeof data === "string" ? data : data?.handle ?? ""}
          </p>
        </section>

        {currentUser && (
          <section>
            <nav className="flex gap-2">
              <Link
                to={`/admin/create-recipe/${userId}`}
                className="px-5 py-2 rounded-lg dark:bg-[#d2b48c]/20 dark:hover:bg-[#d2b48c]/30 dark:text-[#d2b48c] font-bold text-sm bg-green-950/80 text-white transition-colors hover:bg-green-950"
              >
                Create Recipe
              </Link>
              <Link
                to={`/admin/${userId}/edit`}
                className="px-5 py-2 rounded-lg dark:bg-[#d2b48c]/20 dark:hover:bg-[#d2b48c]/30 dark:text-[#d2b48c] font-bold text-sm bg-green-950/80 text-white transition-colors hover:bg-green-950"
              >
                Edit profile
              </Link>
              <LogoutButton />
            </nav>
          </section>
        )}

        <section className="mt-12 w-full">
          <div className="border-b border-slate-400 dark:border-slate-800">
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
          {activeTab === "recipes" && <UserRecipes user={user!} />}
        </div>
      </div>

      <div
        className="w-full"
        id="tab-favorites"
        role="tabpanel"
        hidden={activeTab !== "favorites"}
      >
        {activeTab === "favorites" && <UserFavorites user={user!} />}
      </div>
    </>
  );
}
