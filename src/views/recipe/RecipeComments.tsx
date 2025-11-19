import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getAllComments,
  getUserProfileData,
} from "../../api/CookMateAPI";
import { Link, useParams } from "react-router-dom";
import CreateComment from "./CreateComment";
import type { Comment, UserLoggedIn } from "../../types";
import { toast } from "sonner";

export default function RecipeComments() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data } = useQuery({
    queryKey: ["recipeComments", recipeId],
    queryFn: () => getAllComments(recipeId as string),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  //fetch current logged in user data
  const { data: meData } = useQuery<UserLoggedIn>({
    queryKey: ["userProfileInfo"],
    queryFn: () => getUserProfileData(),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commentId: string) =>
      deleteComment(recipeId as string, commentId),
    onSuccess: (data) => {
      // Invalidate and refetch or update cache as needed
      toast.success(data || "Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["recipeComments", recipeId] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete comment!.");
    },
  });

  const handleDeleteComment = (recipeId: string, commentId: string) => {
    mutation.mutate(commentId);
  };

  return (
    <>
      <div
        className="mt-10 border-t"
        style={{ borderColor: "rgba(210,180,140,0.2)" }}
      >
        <div className="pt-8">
          <h3 className="text-xl font-bold text-[#1f1f1f] dark:text-[#f0eade]">
            Comments
          </h3>
          <div className="mt-4 space-y-6">
            <CreateComment recipeId={recipeId as string} />

            {data && data.length ? (
              data.map((comment: Comment) => (
                <section
                  className="flex items-center justify-between gap-4"
                  key={comment._id}
                >
                  <Link to={`/admin/${comment.author._id}`}>
                    <div
                      className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://picsum.photos/seed/c2/200')",
                      }}
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#1f1f1f] dark:text-[#f0eade]">
                        {comment.author.handle}
                      </p>
                      <p className="text-xs text-[#8a8a8a]">
                        @{comment.author.handle}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-[#1f1f1f] dark:text-[#f0eade]">
                      {comment.text}
                    </p>
                  </div>
                  {meData?.id === comment.author._id ? (
                    <div className="bg-red-500/20 p-2 rounded-md hover:bg-red-500/40 cursor-pointer">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          handleDeleteComment(recipeId as string, comment._id)
                        }
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  ) : null}
                </section>
              ))
            ) : (
              <p className="text-md font-medium text-center text-gray-500 mt-10">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
