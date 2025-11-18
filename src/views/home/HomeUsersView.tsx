import { useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { UserSocial } from "../../types";
import { getAllUsersPaged } from "../../api/CookMateAPI";
import type { UsersPage } from "../../api/CookMateAPI";
import Spinner from "../../components/Spinner";

export default function HomeUsersView({ data }: { data?: UserSocial[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const Limit = 20;

  const {
    data: pagedData,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<UsersPage, Error>({
    queryKey: ["getAllUsersPaged"],
    queryFn: async ({ pageParam }: { pageParam?: unknown }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      const res = await getAllUsersPaged(page, Limit);
      if (!res || typeof res === "string") {
        // surface API errors to react-query
        throw new Error(String(res ?? "Failed to load users"));
      }
      return res as UsersPage;
    },
    getNextPageParam: (lastPage: UsersPage) =>
      lastPage?.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const filterUsers = (users: UserSocial[], term: string) => {
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term.toLowerCase()) ||
        user.handle?.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );
  };

  // If `data` prop is provided, keep legacy behavior (non-paged). Otherwise use paged data from the API.
  let usersToRender: UserSocial[] = [];
  if (Array.isArray(data)) {
    usersToRender = data;
  } else {
    if (isLoading) return <Spinner />;
    if (isError) {
      console.error("HomeUsersView: paged users load failed", {
        pagedData,
        error,
      });
      return (
        <div className="text-sm text-red-600">
          Error loading users: {error?.message ?? "Unknown error"}
        </div>
      );
    }
    if (!pagedData || !pagedData.pages) {
      usersToRender = [];
    } else {
      usersToRender = (pagedData.pages as UsersPage[]).flatMap(
        (p) => p.users ?? []
      );
    }
  }

  const filteredData = filterUsers(usersToRender, searchTerm);

  return (
    <section className="max-w-5xl mx-auto py-8 px-4">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-[#e2e8f0]">
          Users
        </h2>
        <p className="mt-1 text-[#64748b] dark:text-[#94a3b8]">
          Browse creators and see their recipes or favorites.
        </p>
      </header>

      <article>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-950/50 focus:border-green-950/80 dark:bg-[#2a2a2a] dark:border-[#334155] dark:focus:border-[#c9ad80] dark:focus:ring-0 dark:text-[#e2e8f0] dark:placeholder-[#94a3b8]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </article>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((user) => (
          <li
            key={user._id}
            className="bg-[#ffffff] dark:bg-[#1a2e28] border border-[#e2e8f0] dark:border-[#334155] rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <div className="h-14 w-14 rounded-full bg-green-950/80 dark:bg-[#11211c] flex items-center justify-center text-xl font-bold text-white dark:text-[#e2e8f0]">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.handle?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#0f172a] dark:text-[#e2e8f0] truncate">
                  {user.name || user.handle}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  @{user.handle}
                </p>
                <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8] truncate">
                  {user.email}
                </p>
              </div>

              <div className="flex-none text-right">
                <Link
                  to={`/admin/${user._id}`}
                  className="inline-block px-3 py-1 rounded-md bg-green-950/80 dark:bg-[#c9ad80] dark:text-black text-white font-medium hover:opacity-90"
                >
                  View
                </Link>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-[#64748b] dark:text-[#94a3b8]">
              <span>
                {Array.isArray(user.recipes) ? user.recipes.length : 0} recipes
              </span>
              <span>
                {Array.isArray(user.favorites) ? user.favorites.length : 0}{" "}
                favorites
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls for paged API (only when not receiving `data` prop) */}
      {!Array.isArray(data) && (
        <div className="mt-6 text-center">
          {hasNextPage ? (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2 rounded-md bg-green-950/80 text-white hover:bg-green-950"
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : (
            <div className="text-sm text-gray-500 mt-2">No more users</div>
          )}
        </div>
      )}
    </section>
  );
}
