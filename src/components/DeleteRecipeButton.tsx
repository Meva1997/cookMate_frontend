import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteRecipeById } from "../api/CookMateAPI";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

type DeleteRecipeButtonProps = {
  recipeId: string;
  authorId: string;
};

export default function DeleteRecipeButton({
  recipeId,
  authorId,
}: DeleteRecipeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = new QueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteRecipeById(recipeId),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (err: unknown) => {
      if (isAxiosError(err) && err.response?.data?.error) {
        toast.error(String(err.response.data.error));
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to delete recipe. Please try again.");
      }
      setIsLoading(false);
    },
    onSuccess: () => {
      toast.success("Recipe deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllRecipes"] });
      window.location.assign(`/admin/${authorId}`);
      setIsLoading(false);
    },
  });
  return (
    <>
      {isLoading ? (
        <p className="animate-pulse">Deleting...</p>
      ) : (
        <button
          className="cursor-pointer"
          onClick={() => {
            deleteMutation.mutate();
          }}
        >
          Delete Recipe
        </button>
      )}
    </>
  );
}
