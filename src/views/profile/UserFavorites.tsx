import { Suspense } from "react";
import Spinner from "../../components/Spinner";

type UserFavoritesProps = {
  favorites?: string[];
};

export default function UserFavorites({ favorites }: UserFavoritesProps) {
  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {!favorites || favorites.length === 0 ? (
        <p className="text-[#64748b] dark:text-[#94a3b8]">
          This user has not added any favorites yet.
        </p>
      ) : (
        favorites.map((title, i) => (
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
        ))
      )}
    </div>
  );
}
