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
            <article key={c.title} className="group">
              <div className="rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
              </div>
              <h3 className="text-lg font-bold">Title: {c.title}</h3>
              <p className="text-sm dark:text-white">By: {c.author.name}</p>
              <div className="flex items-center text-sm dark:text-white mt-2 space-x-2">
                <span>{c.likes.length} ❤️</span>
                <span>{c.favorites.length} ⭐</span>
              </div>
              <div className="bg-green-950/80 hover:bg-green-950 text-white  dark:bg-[#c9ad80] dark:hover:bg-[#a4885a] w-1/2 mt-2 text-sm rounded-lg text-center dark:text-black font-medium">
                <Link to={`/user/${c.author._id}/recipe/${c._id}`}>
                  View Recipe
                </Link>
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
