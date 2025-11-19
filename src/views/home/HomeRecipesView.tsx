import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../api/CookMateAPI";
import type { RecipesPage } from "../../types";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { categories } from "../../db";

export default function HomeRecipesView() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const Limit = 20;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<RecipesPage, Error>({
    queryKey: ["getAllRecipes"],
    queryFn: async ({ pageParam }: { pageParam?: unknown }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      const res = await getAllRecipes(page, Limit);
      return res as RecipesPage;
    },
    getNextPageParam: (lastPage: RecipesPage) =>
      lastPage?.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="text-sm text-red-600">Error loading recipes.</div>;
  }
  // Add type guard to ensure data is an array before mapping
  if (!data || !data.pages) {
    return <div className="text-sm text-red-600">No recipes found.</div>;
  }

  // flatten pages into a single array
  const allRecipes = (data.pages as RecipesPage[]).flatMap(
    (p) => p.recipes ?? []
  );

  // filter recipe by category selected
  const filterRecipesByCategory = (category: string) => {
    if (category === "All") return allRecipes;
    return allRecipes.filter((recipe) => recipe.category === category);
  };

  const filtered = filterRecipesByCategory(selectedCategory);

  return (
    <article>
      <section className="my-8">
        <div className="flex items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
              className={`px-4 py-2 rounded-lg text-md font-medium mr-2 mb-2 transition-colors ${
                selectedCategory === category
                  ? "bg-green-950/80 text-white dark:bg-[#c9ad80] dark:text-black"
                  : "bg-gray-200 text-gray-800 dark:bg-[#334155] dark:text-[#94a3b8] hover:bg-gray-300 dark:hover:bg-[#475569] cursor-pointer"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((c) => (
            <article
              key={c._id ?? c.title}
              className="bg-[#ffffff] dark:bg-[#1a2e28] border border-[#e2e8f0] dark:border-[#334155] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
            >
              <Link
                to={`/user/${c.author._id}/recipe/${c._id}`}
                className="block"
              >
                <div
                  className="h-44 w-full bg-center bg-no-repeat bg-cover flex items-center justify-center overflow-hidden"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
              </Link>

              <div className="p-4">
                <h3 className="text-md font-semibold text-[#0f172a] dark:text-[#e2e8f0] truncate">
                  Title: {c.title}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-2">
                  By: {c.author.name}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#11211c] text-gray-700 dark:text-gray-200 rounded-full">
                      {c.category}
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
                        <span className="font-medium">{c.likes.length}</span>
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
                          {c.favorites.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/user/${c.author._id}/recipe/${c._id}`}
                    className="px-5 py-2 rounded-lg dark:bg-[#d2b48c]/20 dark:hover:bg-[#d2b48c]/30 dark:text-[#d2b48c] font-bold text-sm bg-green-950/80 text-white transition-colors hover:bg-green-950"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-xl text-center col-span-full text-red-600 animate-pulse my-20">
            No recipes found for the selected category.
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 rounded-md bg-green-950/80 text-white hover:bg-green-950"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        ) : (
          <div className="text-sm text-gray-500 mt-2">No more recipes</div>
        )}
      </div>
    </article>
  );
}
