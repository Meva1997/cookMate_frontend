import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../api/CookMateAPI";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import type { RecipeArray } from "../../types";

type RecipeSimilarProps = {
  data: string;
  currentId?: string;
};

export default function RecipeSimilar({
  data: category,
  currentId,
}: RecipeSimilarProps) {
  const {
    data: recipesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: () => getAllRecipes(1, 20) as Promise<{ recipes: RecipeArray[] }>,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const filteredRecipes: RecipeArray[] = recipesData
    ? recipesData?.recipes.filter(
        (r: RecipeArray) => r.category === category && r._id !== currentId
      )
    : [];

  if (!category) return null;

  if (isLoading) {
    return (
      <div className="mt-4">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-600">Error loading similar recipes.</div>
    );
  }

  return (
    <>
      <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-[#f0eade]">
        Similar Recipes by Category:{" "}
        <span className="text-[#d2b48c] font-bold">{category}</span>
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-6">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((r: RecipeArray) => (
            <Link
              key={r._id}
              to={`/user/${r.author._id}/recipe/${r._id}`}
              className="group"
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: r.image
                      ? `url('${r.image}')`
                      : `url('https://picsum.photos/seed/sim-${r._id}/600')`,
                  }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-[#1f1f1f] dark:text-[#f0eade] group-hover:text-[#d2b48c]">
                Title: {r.title}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-[#8a8a8a]">No similar recipes found.</p>
        )}
      </div>
    </>
  );
}
