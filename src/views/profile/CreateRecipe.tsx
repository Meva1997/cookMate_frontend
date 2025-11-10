import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { CreateRecipeForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function CreateRecipe() {
  const initialValues: CreateRecipeForm = {
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "",
    author: "6906259b22a3fccd708689d6", // hardcoded for now
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleCreateRecipe = (formData: CreateRecipeForm) => {
    const createRecipePromise = api.post("/recipes", formData);

    // show toast tied to the axios promise; success receives the full response
    toast.promise(createRecipePromise, {
      loading: "Creating your recipe...",
      success: (res) => {
        // res is the axios response object; return a string to show in the toast
        reset();
        return String(res.data);
      },
      error: (err) => {
        // optional: return server error message if available
        if (isAxiosError(err) && err.response?.data?.error) {
          return String(err.response.data.error);
        }
        return "Failed to create recipe. Please try again.";
      },
    });
  };

  // "primary": "#19e6a2",
  //           "background-light": "#f6f8f7",
  //           "background-dark": "#11211c",
  //           "surface-light": "#ffffff",
  //           "surface-dark": "#1a2e28",
  //           "text-light": "#0f172a",
  //           "text-dark": "#e2e8f0",
  //           "subtle-light": "#64748b",
  //           "subtle-dark": "#94a3b8",
  //           "border-light": "#e2e8f0",
  //           "border-dark": "#334155",

  return (
    <main className="flex grow container max-w-5xl mx-auto py-8 md:py-12">
      <div className="mx-auto w-3/4 p-6 sm:p-8 rounded-xl shadow-lg  bg-[#ffffff] dark:bg-[#1f1f1f]">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-[#e2e8f0]">
            Create Recipe
          </h1>
          <p className="mt-2 text-[#64748b] dark:text-[#94a3b8]">
            Share your culinary masterpiece with the world.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleCreateRecipe)}>
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
              placeholder={`List each ingredient on a new line.\ne.g., 200g Pasta\n1 can Chopped Tomatoes\n2 cloves Garlic`}
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
              <option>Select a category</option>
              <option value={"Breakfast"}>Breakfast</option>
              <option value={"Lunch"}>Lunch</option>
              <option value={"Dinner"}>Dinner</option>
              <option value={"Dessert"}>Dessert</option>
            </select>
            {errors.category && (
              <ErrorMessage>{errors.category.message}</ErrorMessage>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2">
              Recipe Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-[#e2e8f0] dark:border-[#3a3a3a] px-6 py-10 transition-colors">
              <div className="text-center">
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
                    htmlFor="file-upload"
                  >
                    <span>Upload a file</span>
                    <input
                      className="sr-only"
                      id="file-upload"
                      name="file-upload"
                      type="file"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>

                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div> */}

          <input
            type="hidden"
            value={"6906259b22a3fccd708689d6"}
            id="author"
            {...register("author")}
          />

          <div className="pt-4 flex space-x-2 justify-end">
            <Link
              to="/admin"
              className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md bg-[#f8f5f2] hover:bg-gray-400 dark:bg-[#2a2a2a] dark:hover:bg-[#a4885a] text-[#1f1f1f] dark:text-[#e2e8f0] border border-[#e2e8f0] dark:border-[#3a3a3a]"
            >
              Back to Profile
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md hover:bg-[#1aa174] bg-[#19e6a2] dark:hover:bg-[#a4885a] dark:bg-[#c9ad80] text-[#1f1f1f] cursor-pointer"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
