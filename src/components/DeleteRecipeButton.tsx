import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteRecipeById } from "../api/CookMateAPI";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import DeletionConfirm from "./DeletionConfirm";

type DeleteRecipeButtonProps = {
  recipeId: string;
  // authorId may be a string id or an object returned from the API (e.g. { _id, name })
  authorId: string | { _id?: string; id?: string; name?: string };
};

export default function DeleteRecipeButton({
  recipeId,
  authorId,
}: DeleteRecipeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();
  const resolvedAuthorId =
    typeof authorId === "string"
      ? authorId
      : String(authorId?._id ?? authorId?.id ?? "");
  const navigate = useNavigate();
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
      // navigate SPA to the author's profile — resolvedAuthorId may be empty, fallback to /home
      if (resolvedAuthorId) {
        navigate(`/admin/${resolvedAuthorId}`);
      } else {
        navigate(`/home`);
      }
      setIsLoading(false);
    },
  });
  return (
    <>
      {isLoading ? (
        <p className="animate-pulse">Deleting...</p>
      ) : (
        <>
          <button
            className="cursor-pointer"
            onClick={() => setShowConfirm(true)}
          >
            Delete Recipe
          </button>

          <DeletionConfirm
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
              setShowConfirm(false);
              deleteMutation.mutate();
            }}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}
