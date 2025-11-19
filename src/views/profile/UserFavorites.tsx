// import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getUserFavorites } from "../../api/CookMateAPI";
import type { UserSocial, RecipeArray } from "../../types";
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
          (data as RecipeArray[]).map((recipe) => (
            <article
              key={recipe._id}
              className="bg-[#ffffff] dark:bg-[#1a2e28] border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
            >
              <Link
                to={`/user/${user.id}/recipe/${recipe._id}`}
                className="block"
              >
                <div className="h-44 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 dark:text-gray-300 p-4">
                      No image
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-md font-semibold text-[#0f172a] dark:text-[#e2e8f0] truncate">
                  Title: {recipe.title}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 max-h-12 overflow-hidden">
                  Description: {recipe.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#11211c] text-gray-700 dark:text-gray-200 rounded-full">
                      {recipe.category}
                    </span>
                    <div className="flex items-center gap-3 text-[#64748b] dark:text-[#94a3b8]">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          fill="currentColor"
                          height="18"
                          viewBox="0 0 256 256"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
                        </svg>
                        <span className="font-medium">
                          {recipe.likes?.length ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          fill="currentColor"
                          height="18"
                          viewBox="0 0 256 256"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
                        </svg>
                        <span className="font-medium">
                          {recipe.favorites?.length ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-start">
                  <Link
                    to={`/user/${user.id}/recipe/${recipe._id}`}
                    className="px-5 py-2 rounded-lg dark:bg-[#d2b48c]/20 dark:hover:bg-[#d2b48c]/30 dark:text-[#d2b48c] font-bold text-sm bg-green-950/80 text-white transition-colors hover:bg-green-950"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    );
}
