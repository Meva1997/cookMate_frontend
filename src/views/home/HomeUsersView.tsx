import { useState } from "react";
import { Link } from "react-router-dom";
import type { UserSocial } from "../../types";

export default function HomeUsersView({ data }: { data: UserSocial[] }) {
  // if (!data || data.length === 0) {
  //   return (
  //     <div className="max-w-5xl mx-auto py-12 px-4 text-center">
  //       <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-[#e2e8f0]">
  //         No users found
  //       </h2>
  //       <p className="mt-2 text-[#64748b] dark:text-[#94a3b8]">
  //         There are no users to show yet.
  //       </p>
  //     </div>
  //   );
  // }

  const [searchTerm, setSearchTerm] = useState("");

  const filterUsers = (users: UserSocial[], term: string) => {
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(term.toLowerCase()) ||
        user.handle?.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredData = filterUsers(data, searchTerm);

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
          className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#19e6a2]/50 focus:border-[#19e6a2] dark:bg-[#2a2a2a] dark:border-[#334155] dark:focus:border-[#c9ad80] dark:focus:ring-0 dark:text-[#e2e8f0] dark:placeholder-[#94a3b8]"
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
                <div className="h-14 w-14 rounded-full bg-[#f6f8f7] dark:bg-[#11211c] flex items-center justify-center text-xl font-bold text-[#0f172a] dark:text-[#e2e8f0]">
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
                  className="inline-block px-3 py-1 rounded-md bg-[#19e6a2] dark:bg-[#c9ad80] dark:text-black text-white font-medium hover:opacity-90"
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
    </section>
  );
}
