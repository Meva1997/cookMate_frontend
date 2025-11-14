import Spinner from "../../components/Spinner";
import type { RecipeArray, UserSocial } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getUserRecipes } from "../../api/CookMateAPI";
import { Link } from "react-router-dom";

type UserRecipesProps = {
  user: UserSocial;
};

export default function UserRecipes({ user }: UserRecipesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userRecipes", user.id],
    queryFn: () => getUserRecipes(user.id!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

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
          {typeof data === "string" ? data : "Error loading user recipes."}
        </p>
      </div>
    );
  }
  const recipes: RecipeArray[] = Array.isArray(data)
    ? data
    : data?.recipes ?? [];

  if (data)
    return (
      <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe: RecipeArray) => (
            <div
              key={recipe._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {recipe.title}
                </h3>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="mt-4 rounded-md max-h-40 w-full object-cover"
                  />
                )}
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {recipe.description}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {recipe.category}
                </p>
                <div className="flex space-x-4">
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {recipe.favorites.length} Favorites
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {recipe.likes.length} Likes
                  </p>
                </div>
                <Link
                  to={`/user/${user.id}/recipe/${recipe._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            This user has no recipes.
          </p>
        )}
      </div>
    );
}
