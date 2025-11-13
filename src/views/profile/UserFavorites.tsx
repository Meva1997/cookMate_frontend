// import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getUserFavorites } from "../../api/CookMateAPI";
import type { UserSocial } from "../../types";
import { Link } from "react-router-dom";

type UserFavoritesProps = {
  user: UserSocial;
};

export default function UserFavorites({ user }: UserFavoritesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userFavorites", user.id],
    queryFn: () => getUserFavorites(user.id!),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  console.log("🚀 ~ UserFavorites ~ data:", data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (isError || typeof data === "string") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">
          {typeof data === "string" ? data : "Error loading user favorites."}
        </p>
      </div>
    );
  }

  if (data)
    return (
      <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length === 0 ? (
          <div className="text-center col-span-full mt-20">
            <p className="text-red-500">
              This user has not added any favorites yet.
            </p>
          </div>
        ) : (
          data.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {recipe.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {recipe.description}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {recipe.category}
                </p>
                <div className="flex space-x-4">
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Likes: {recipe.likes.length ?? 0}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Favorites: {recipe.favorites?.length ?? 0}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/user/${user.id}/recipe/${recipe._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
}
