import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types";

export default function UserEditProfile() {
  const { userId } = useParams<{ userId: string }>();

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<User>(["userProfile", userId]); //use the userId to get the correct data from the cache of userProfile fetched on UserProfileView

  const initiaValues: User = {
    handle: data?.handle || "",
    name: data?.name || "",
    email: data?.email || "",
  };

  const { register, handleSubmit } = useForm({ defaultValues: initiaValues });

  const handleUpdateProfile = (formData: User) => {
    console.log(formData);
  };

  return (
    <main className="flex grow container max-w-5xl mx-auto py-8 md:py-12">
      <div className="mx-auto w-3/4 p-6 sm:p-8 rounded-xl shadow-lg bg-[#ffffff] dark:bg-gray-900/30">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] dark:text-[#e2e8f0]">
            Edit profile
          </h1>
          <p className="mt-2 text-[#64748b] dark:text-[#94a3b8]">
            Update your public handle and contact information.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div>
            <label
              htmlFor="handle"
              className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
            >
              Handle
            </label>
            <input
              id="handle"
              type="text"
              placeholder="e.g., cookLover"
              className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#2a2a2a] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#19e6a2]/50 focus:border-[#19e6a2] dark:focus:ring-[#a4885a]/50 dark:focus:border-[#a4885a] transition-all"
              {...register("handle")}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Sofia Rodriguez"
              className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#2a2a2a] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#19e6a2]/50 focus:border-[#19e6a2] dark:focus:ring-[#a4885a]/50 dark:focus:border-[#a4885a] transition-all"
              {...register("name")}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#0f172a] dark:text-[#e2e8f0] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-3 bg-[#f6f8f7] dark:bg-[#2a2a2a] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#e2e8f0] placeholder-[#64748b] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-[#19e6a2]/50 focus:border-[#19e6a2] dark:focus:ring-[#a4885a]/50 dark:focus:border-[#a4885a] transition-all"
              {...register("email")}
            />
          </div>

          <input type="hidden" value={"6906259b22a3fccd708689d6"} id="author" />

          <div className="pt-4 flex space-x-2 justify-end">
            <Link
              to={`/admin/${userId}`}
              className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md bg-[#f8f5f2] hover:bg-gray-400 dark:bg-[#2a2a2a] dark:hover:bg-[#a4885a] text-[#1f1f1f] dark:text-[#e2e8f0] border border-[#e2e8f0] dark:border-[#3a3a3a]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 font-bold rounded-lg focus:outline-none transition-all shadow-sm hover:shadow-md hover:bg-[#1aa174] bg-[#19e6a2] dark:hover:bg-[#a4885a] dark:bg-[#c9ad80] text-[#1f1f1f] cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
