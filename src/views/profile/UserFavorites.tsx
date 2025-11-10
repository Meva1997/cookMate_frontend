import { Suspense } from "react";
import Spinner from "../../components/Spinner";

export default function UserFavorites() {
  const favorites = [
    "Roasted Vegetable Tart",
    "Classic Pancakes",
    "Garlic Butter Shrimp",
    "Vegan Buddha Bowl",
    "Strawberry Cheesecake Bars",
    "Miso Ramen",
  ];

  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favorites.map((title, i) => (
        <div className="group flex flex-col gap-3" key={i}>
          <Suspense fallback={<Spinner />}>
            <div
              className="w-full bg-cover bg-center aspect-square rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://picsum.photos/seed/fav-${i}/600')`,
              }}
            />
          </Suspense>
          <h3 className="font-medium text-slate-800 dark:text-slate-200">
            {title}
          </h3>
        </div>
      ))}
    </div>
  );
}
