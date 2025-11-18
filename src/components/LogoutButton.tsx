import { useState } from "react";
import { toast } from "sonner";
import Spinner from "./Spinner";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    try {
      // Clear any authentication tokens or user data from local storage or context
      localStorage.removeItem("cookMate_token");
      toast.success("Logged out successfully!");
      setIsLoading(true);
      setTimeout(() => {
        window.location.assign("/home");

        setIsLoading(false);
      }, 1200);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Error logging out. Please try again.";
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center -mt-25">
          <Spinner />
        </div>
      ) : (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="px-5 py-2 rounded-lg dark:bg-[#d2b48c]/20 dark:hover:bg-[#d2b48c]/30 dark:text-[#d2b48c] font-bold text-sm bg-green-950/80 hover:bg-green-950 text-white transition-colors cursor-pointer"
        >
          Log out
        </button>
      )}
    </>
  );
}
