import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage";
import { categories } from "../../db";
import type { CreateRecipeForm, RecipeArray } from "../../types";
import {
  getRecipeById,
  uploadRecipeImage,
  updateRecipeById,
  getUserProfileData,
} from "../../api/CookMateAPI";
import DeleteRecipeButton from "../../components/DeleteRecipeButton";

export default function EditRecipeInfo() {
  const { userId } = useParams<{ userId: string }>();
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: meData } = useQuery({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    enabled: !!userId, // only run if userId is defined
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const currentUser = meData?.id !== userId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipeInfo", recipeId],
    queryFn: () => getRecipeById(recipeId!),
    enabled: !!recipeId, // only run if recipeId is defined
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const initialValues: CreateRecipeForm = {
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
    author: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initialValues });

  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // when recipe data arrives, populate the form
  useEffect(() => {
    if (!data) return;

    const recipe = data as RecipeArray;
    reset({
      title: recipe.title ?? "",
      description: recipe.description ?? "",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join("\n")
        : "",
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.join("\n")
        : "",
      category: recipe.category ?? "",
      image: recipe.image ?? "",
      // author may be a string id or an object { _id, name }
      author:
        typeof recipe.author === "object"
          ? String(
              (recipe.author as { _id?: string; id?: string })._id ??
                (recipe.author as { _id?: string; id?: string }).id ??
                ""
            )
          : String(recipe.author ?? ""),
    });

    if (recipe.image) setImagePreview(recipe.image);
  }, [data, reset]);

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => uploadRecipeImage(file),
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Image upload failed. Please try again.";
      toast.error(message);
    },
    onSuccess: (res: unknown) => {
      // uploadRecipeImage returns an object with imageUrl
      if (res && typeof res === "object" && "imageUrl" in res) {
        const imageUrl = (res as { imageUrl: string }).imageUrl;
        setValue("image", imageUrl);
        setImagePreview(imageUrl);
        toast.success("Image uploaded successfully!");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<RecipeArray>) =>
      updateRecipeById(recipeId!, payload),
    onError: (err: unknown) => {
      if (isAxiosError(err) && err.response?.data?.error) {
        toast.error(String(err.response.data.error));
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to update recipe. Please try again.");
      }
    },
    onSuccess: (updated: unknown) => {
      toast.success("Recipe updated successfully!");
      // update query cache so UI reflects changes
      queryClient.setQueryData(["recipeInfo", recipeId], updated);
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
      // navigate back to profile or recipe page
      const authorId =
        updated && typeof updated === "object" && "author" in updated
          ? (updated as { author: string }).author
          : watch("author");
      navigate(`/admin/${authorId}`);
    },
  });

  // removed separate handleChange; we use the hidden file input's onChange below

  const onSubmit = async (formData: CreateRecipeForm) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image || imagePreview,
      ingredients: formData.ingredients
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      instructions: formData.instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      // formData.author is the author id string (we saved _id into the hidden field)
      author: String(formData.author),
    };

    const prom = updateMutation.mutateAsync(
      payload as unknown as Partial<RecipeArray>
    );
    return toast.promise(prom, {
      loading: "Updating recipe...",
      success: "Recipe updated",
      error: "Failed to update recipe",
    });
  };

  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage) setImagePreview(watchedImage);
  }, [watchedImage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading recipe.</p>
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-red-500">
            You do not have permission to edit this recipe.
          </p>
          <Link
            to="/home"
            className="text-blue-500 hover:underline mt-2 animate-pulse"
          >
            Go back to home
          </Link>
        </div>
      ) : (
        <main className="flex grow container max-w-5xl mx-auto py-8 md:py-12">
          <div className="mx-auto w-3/4 p-6 sm:p-8 rounded-xl shadow-lg  bg-[#ffffff] dark:bg-[#1f1f1f]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-[#e2e8f0]">
                  Edit Recipe
                </h1>
                <p className="mt-2 text-[#64748b] dark:text-[#94a3b8]">
                  Update your recipe details.
                </p>
              </div>
              <div className="bg-red-500 p-2 rounded-lg  hover:bg-red-700 transition-colors cursor-pointer">
                <DeleteRecipeButton
                  recipeId={recipeId!}
                  authorId={watch("author")}
                />
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Spicy Tomato Pasta"
                  className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#1f1f1f] border border-[#e2e8f0] dark:border-[#3a3a3a] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#d2b48c]/50 focus:border-[#d2b48c] transition-all"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="A short and sweet description of your recipe..."
                  className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#1f1f1f] border border-[#e2e8f0] dark:border-[#3a3a3a] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#d2b48c]/50 focus:border-[#d2b48c] transition-all"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
                  htmlFor="ingredients"
                >
                  Ingredients
                </label>
                <textarea
                  id="ingredients"
                  rows={5}
                  placeholder={`List each ingredient on a new line.`}
                  className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#1f1f1f] border border-[#e2e8f0] dark:border-[#3a3a3a] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#d2b48c]/50 focus:border-[#d2b48c] transition-all"
                  {...register("ingredients", {
                    required: "Ingredients are required",
                  })}
                />
                {errors.ingredients && (
                  <ErrorMessage>{errors.ingredients.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
                  htmlFor="instructions"
                >
                  Steps
                </label>
                <textarea
                  id="instructions"
                  rows={7}
                  placeholder="Describe the preparation steps, one per line."
                  className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#1f1f1f] border border-[#e2e8f0] dark:border-[#3a3a3a] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#d2b48c]/50 focus:border-[#d2b48c] transition-all"
                  {...register("instructions", {
                    required: "Instructions are required",
                  })}
                />
                {errors.instructions && (
                  <ErrorMessage>{errors.instructions.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#1f1f1f] border border-[#e2e8f0] dark:border-[#3a3a3a] text-[#0f172a] dark:text-[#e2e8f0] focus:outline-none focus:ring-[#d2b48c]/50 focus:border-[#d2b48c] transition-all appearance-none bg-no-repeat bg-right"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <ErrorMessage>{errors.category.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2">
                  Recipe Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] dark:border-[#3a3a3a] px-6 py-10 transition-colors">
                  <div className="text-center">
                    {imagePreview.length ? (
                      <div className="mt-4 flex flex-col items-center">
                        <img
                          src={imagePreview}
                          alt="Recipe Preview"
                          className="max-h-40 rounded-md"
                        />
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 text-sm rounded-md bg-green-950/80 text-white dark:text-black dark:bg-[#d2b48c] border hover:opacity-50 cursor-pointer"
                          >
                            Change image
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // remove image preview and form value if user wants to remove it
                              setImagePreview("");
                              setValue("image", "");
                            }}
                            className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-700 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="mx-auto h-12 w-12 text-[#64748b] dark:text-[#94a3b8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="mt-4 flex text-sm text-[#64748b] dark:text-[#94a3b8] justify-center">
                          <label
                            className="relative cursor-pointer rounded-md font-medium text-[#d2b48c] hover:opacity-90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#2a2a2a] focus-within:ring-[#d2b48c]/50"
                            htmlFor="image"
                          >
                            <span>Upload a image</span>
                            <p className="pl-1">or drag and drop</p>
                            <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                  {/* hidden file input used for both upload and change */}
                  <input
                    ref={fileInputRef}
                    className="sr-only"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // clear input after upload completes so same file can be selected again
                        uploadImageMutation.mutate(file, {
                          onSettled: () => {
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <input type="hidden" id="author" {...register("author")} />

              <div className="pt-4 flex space-x-2 justify-end">
                <Link
                  to={`/admin/${watch("author")}`}
                  className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md bg-[#f8f5f2] hover:bg-gray-400 dark:bg-[#2a2a2a] dark:hover:bg-[#a4885a] text-[#1f1f1f] dark:text-[#e2e8f0] border border-[#e2e8f0] dark:border-[#3a3a3a]"
                >
                  Back to Profile
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md hover:bg-green-950 bg-green-950/80 dark:hover:bg-[#a4885a] dark:bg-[#c9ad80] text-white cursor-pointer"
                >
                  {isSubmitting ? "Updating..." : "Update Recipe"}
                </button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}
