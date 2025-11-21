import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../api/CookMateAPI";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "sonner";

type createCommentProps = {
  recipeId: string;
};

export default function CreateComment({ recipeId }: createCommentProps) {
  const initialValues = {
    comment: "",
  };

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: (commentText: string) =>
      postComment(recipeId, commentText, userImage?.imageUrl || ""),
    onSuccess: (data) => {
      toast.success(data || "Comment posted successfully!");
      queryClient.invalidateQueries({ queryKey: ["recipeComments", recipeId] });
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to post comment!.");
    },
  });

  const handlePost = (formData: { comment: string }) => {
    const commentText = formData.comment.trim();
    mutation.mutate(commentText);
  };

  const queryCache = queryClient.getQueryCache() as QueryCache;
  const queryUserProfileInfo = queryCache.find({
    queryKey: ["userProfileInfo"],
  });
  const meData = queryUserProfileInfo?.state.data as { id: string } | undefined;
  const query = queryCache.find({ queryKey: ["userImage", meData?.id] });
  const userImage = query?.state.data as { imageUrl: string } | undefined;

  return (
    <>
      <div className="flex items-start gap-4">
        <div
          className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: userImage
              ? `url(${userImage.imageUrl})`
              : "url('https://picsum.photos/seed/c2/200')",
          }}
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit(handlePost)} className="relative">
            <div className="relative">
              <input
                className="w-full rounded-lg p-4 pr-28 text-sm border-2 border-green-950/80 dark:border-[#c9ad80] focus:outline-none focus:ring-2 focus:ring-green-950/50 dark:focus:ring-[#c9ad80]"
                placeholder="Add a comment..."
                {...register("comment", {
                  required: "Comment cannot be empty",
                })}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-4 py-2 font-semibold bg-green-950/80 dark:bg-[#c9ad80] text-white"
                type="submit"
                disabled={mutation.isPending}
              >
                Post
              </button>
            </div>
            {errors.comment && (
              <div className="mt-2">
                <ErrorMessage>{errors.comment.message}</ErrorMessage>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
