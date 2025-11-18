import HomeUsersView from "./HomeUsersView";
import HomeRecipesView from "./HomeRecipesView";

export default function HomeView() {
  return (
    <>
      <section className="mb-12">
        <div
          className="relative rounded-xl overflow-hidden min-h-80 flex items-center justify-center p-8 text-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url('https://res.cloudinary.com/dukbscvow/image/upload/v1763472641/Captura_de_pantalla_2025-11-18_a_la_s_7.30.22_a.m._iugbxs.png')",
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

      <hr className="mt-6" />

      {/* Users Section: render the paginated users view (it handles fetching) */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Our Community</h2>
        <HomeUsersView />
      </section>
    </>
  );
}
