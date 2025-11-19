import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRecipeById,
  likeRecipe,
  unlikeRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
  getUserProfileData,
} from "../../api/CookMateAPI";
import type { RecipeArray, UserLoggedIn } from "../../types";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import RecipeComments from "./RecipeComments";
import RecipeSimilar from "./RecipeSimilar";
import { useState } from "react";

export default function RecipeInfo() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipeInfo", recipeId],
    queryFn: () => getRecipeById(recipeId!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // current logged-in user (to determine if they liked/favorited)
  const { data: meData } = useQuery<UserLoggedIn>({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  const likeMut = useMutation({
    mutationFn: (id: string) => likeRecipe(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recipeInfo", recipeId] }),
  });

  const unlikeMut = useMutation({
    mutationFn: (id: string) => unlikeRecipe(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recipeInfo", recipeId] }),
  });

  const favMut = useMutation({
    mutationFn: (id: string) => favoriteRecipe(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recipeInfo", recipeId] }),
  });

  const unfavMut = useMutation({
    mutationFn: (id: string) => unfavoriteRecipe(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recipeInfo", recipeId] }),
  });

  const isLiked = Boolean(
    data &&
      typeof data !== "string" &&
      meData &&
      Array.isArray((data as RecipeArray).likes) &&
      (data as RecipeArray).likes.some((u) => String(u) === meData.id)
  );

  const isFavorited = Boolean(
    data &&
      typeof data !== "string" &&
      meData &&
      Array.isArray((data as RecipeArray).favorites) &&
      (data as RecipeArray).favorites.some((u) => String(u) === meData.id)
  );

  const handleLikeClick = async () => {
    if (!recipeId) return;
    setLoadingLike(true);
    try {
      if (isLiked) await unlikeMut.mutateAsync(recipeId);
      else await likeMut.mutateAsync(recipeId);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleFavClick = async () => {
    if (!recipeId) return;
    setLoadingFav(true);
    try {
      if (isFavorited) await unfavMut.mutateAsync(recipeId);
      else await favMut.mutateAsync(recipeId);
    } finally {
      setLoadingFav(false);
    }
  };

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
          {typeof data === "string"
            ? data
            : "Error loading recipe information."}
        </p>
      </div>
    );
  }

  if (data)
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex space-x-2 ">
          <div className="mb-4 p-2 dark:bg-[#c9ad80] rounded-lg w-1/4 dark:text-black font-bold text-center dark:hover:bg-[#bfa46f] cursor-pointer transition-colors bg-green-950/80 text-white hover:bg-green-950">
            <Link to={`/admin/${userId}`}>Go to author's profile</Link>
          </div>
          <div className="mb-4 p-2 dark:bg-[#c9ad80] rounded-lg w-1/4 dark:text-black font-bold text-center dark:hover:bg-[#bfa46f] cursor-pointer transition-colors bg-green-950/80 text-white hover:bg-green-950">
            <Link to={"/home"}>Back to home</Link>
          </div>
        </section>
        <section className="overflow-hidden rounded-xl shadow-lg shadow-black bg-[#f8f5f2] dark:bg-[#2a2a2a]">
          <div
            className="aspect-3/2 w-full bg-cover bg-center rounded-t-xl"
            style={{
              backgroundImage: data.image
                ? `url('${data.image}')`
                : "url('https://picsum.photos/seed/recipe/600')",
            }}
          />

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#1f1f1f] dark:text-[#f0eade] sm:text-4xl">
              Title: {data.title}
            </h1>
            <p className="mt-2 text-sm text-[#a1a1a1] dark:text-[#8a8a8a]">
              By{" "}
              <Link
                className="font-bold text-green-900 dark:text-[#d2b48c] hover:opacity-90"
                to={`/admin/${data.author._id}`}
              >
                {data.author.name.toString()}
              </Link>
              &nbsp;· In&nbsp;
              <a
                className="font-bold text-green-900 dark:text-[#d2b48c] hover:opacity-90"
                href="#"
              >
                {data.category.toString()}
              </a>
            </p>

            <div className="mt-4 flex items-center gap-6">
              <button
                className={`flex items-center gap-2 hover:text-[#d2b48c] ${
                  isLiked
                    ? "text-red-500 dark:text-red-400"
                    : "text-[#a1a1a1] dark:text-[#8a8a8a]"
                }`}
                aria-label="likes"
                onClick={handleLikeClick}
                disabled={loadingLike}
              >
                <svg
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
                </svg>
                <span className="text-sm font-medium">
                  {typeof data === "string"
                    ? 0
                    : (data as RecipeArray).likes.length}
                </span>
              </button>

              <button
                className={`flex items-center gap-2 hover:text-[#d2b48c] ${
                  isFavorited
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-[#a1a1a1] dark:text-[#8a8a8a]"
                }`}
                aria-label="bookmarks"
                onClick={handleFavClick}
                disabled={loadingFav}
              >
                <svg
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
                </svg>
                <span className="text-sm font-medium">
                  {typeof data === "string"
                    ? 0
                    : (data as RecipeArray).favorites.length}
                </span>
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-[#f0eade]">
                  Ingredients
                </h3>
                <ul className="mt-4 space-y-3">
                  {data.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-950/80 text-white dark:bg-[#c9ad80]">
                        <svg
                          fill="currentColor"
                          height="20"
                          viewBox="0 0 256 256"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
                        </svg>
                      </span>
                      <span className="text-sm text-[#1f1f1f] dark:text-[#f0eade]">
                        {ing}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-[#f0eade]">
                  Instructions
                </h3>
                <ol className="mt-4 space-y-4">
                  {data.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-950/80 text-white dark:bg-[#c9ad80] font-semibold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#1f1f1f] dark:text-[#f0eade]">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <RecipeComments />

            <div
              className="mt-10 border-t"
              style={{ borderColor: "rgba(210,180,140,0.2)" }}
            >
              <div className="pt-8">
                <RecipeSimilar data={data.category} currentId={data._id} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
