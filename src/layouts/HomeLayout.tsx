import { Link, Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300/40  dark:bg-black font-display  dark:text-white">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white dark:bg-black">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg
              className="h-8 w-8 text-[#19e6a2] dark:text-[#c9ad80]"
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6Z"
                opacity="0.15"
              />
              <path d="M22 28V36H26V28H32L24 19L16 28H22Z" />
              <path d="M24 12C22.3431 12 21 13.3431 21 15C21 16.6569 22.3431 18 24 18C25.6569 18 27 16.6569 27 15C27 13.3431 25.6569 12 24 12Z" />
            </svg>
            <Link to="/home">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                CookMate
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5  dark:text-white"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border dark:focus:border-green-900 outline-none transition-colors duration-200"
                placeholder="Search recipes..."
                type="search"
                aria-label="Search recipes"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#19e6a2] hover:bg-[#16b887] dark:text-black dark:bg-[#c9ad80] dark:hover:bg-[#a4885a] transition-colors cursor-pointer">
              Log In
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://picsum.photos/seed/avatar/200')",
              }}
            />
          </div>
        </nav>
      </header>

      <main className=" grow container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
