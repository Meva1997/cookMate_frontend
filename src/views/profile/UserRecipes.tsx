import { Suspense } from "react";
import Spinner from "../../components/Spinner";

export default function UserRecipes() {
  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
        "Mediterranean Quinoa Salad",
        "Spicy Thai Peanut Noodles",
        "Creamy Tomato Basil Soup",
        "Lemon Herb Roasted Chicken",
        "Chocolate Avocado Mousse",
        "Blueberry Almond Smoothie",
      ].map((title, i) => (
        <div className="group flex flex-col gap-3" key={i}>
          <Suspense fallback={<Spinner />}>
            <div
              className="w-full bg-cover bg-center aspect-square rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://picsum.photos/seed/profile-${i}/600')`,
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
