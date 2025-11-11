import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/CookMateAPI";
import HomeUsersView from "./HomeUsersView";

export default function HomeView() {
  const cards = [
    {
      title: "Tacos al pastor",
      author: "Sofía García",
      time: "30 min",
      likes: 250,
      image: "https://picsum.photos/seed/taco/800",
    },
    {
      title: "Flan napolitano",
      author: "Diego Rodríguez",
      time: "1 hr",
      likes: 180,
      image: "https://picsum.photos/seed/flan/800",
    },
    {
      title: "Pasta carbonara",
      author: "Isabella Rossi",
      time: "25 min",
      likes: 320,
      image: "https://picsum.photos/seed/pasta/800",
    },
    {
      title: "Enchiladas verdes",
      author: "Alejandro López",
      time: "45 min",
      likes: 215,
      image: "https://picsum.photos/seed/enchiladas/800",
    },
    {
      title: "Arroz con leche",
      author: "Camila Fernández",
      time: "50 min",
      likes: 150,
      image: "https://picsum.photos/seed/arroz/800",
    },
    {
      title: "Pizza margarita",
      author: "Marco Bianchi",
      time: "1.5 hr",
      likes: 400,
      image: "https://picsum.photos/seed/pizza/800",
    },
  ];

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

      <section className="mb-8">
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-md font-medium ">
            All
          </button>
          <button className="px-4 py-2 rounded-lg text-md font-medium  transition-colors">
            Mexican
          </button>
          <button className="px-4 py-2 rounded-lg text-md font-medium  transition-colors">
            Desserts
          </button>
          <button className="px-4 py-2 rounded-lg text-md font-medium  transition-colors">
            Italian
          </button>
        </div>
      </section>

      <section className=" rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cards.map((c) => (
            <article key={c.title} className="group">
              <div className="rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
              </div>
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-sm dark:text-white">Por: {c.author}</p>
              <div className="flex items-center text-sm dark:text-white mt-2">
                <span>{c.time}</span>
                <span className="mx-2">•</span>
                <span>{c.likes} ❤️</span>
              </div>
              <div className="bg-[#19e6a2] hover:bg-[#16b887] text-white  dark:bg-[#c9ad80] dark:hover:bg-[#a4885a] w-1/2 mt-2 text-sm rounded-lg text-center dark:text-black font-medium">
                <Link to={"/recipe"}>View Recipe</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

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
