import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/CookMateAPI";
import HomeUsersView from "./HomeUsersView";
import HomeRecipesView from "./HomeRecipesView";

export default function HomeView() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users.</div>;
  }
  return (
    <>
      <section className="mb-12">
        <div
          className="relative rounded-xl overflow-hidden min-h-80 flex items-center justify-center p-8 text-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url('https://picsum.photos/seed/hero/1200')",
          }}
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Discover and share your favorite recipes 🍳
            </h2>
          </div>
        </div>
      </section>

      <hr />

      <HomeRecipesView />

      {/* Users Section */}
      {data && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Our Community</h2>
          {Array.isArray(data) ? (
            <HomeUsersView data={data} />
          ) : (
            <div className="text-sm text-red-600">Unable to load users.</div>
          )}
        </section>
      )}
    </>
  );
}
