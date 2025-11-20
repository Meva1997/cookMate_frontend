import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function FooterInfo() {
  return (
    <>
      <footer className="py-6 space-y-4 bg-white dark:bg-gray-900/50 border-t border-slate-200 dark:border-slate-800 mt-8">
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-xl font-bold text-center text-green-900">
            Contact Me
          </h3>

          <div className="flex justify-center py-2 space-x-4 text-4xl text-green-900">
            <a
              href="https://www.linkedin.com/in/alex-fullstack-developer/"
              rel="noopener noreferrer"
              target="_blank"
              className="transition-transform hover:scale-105"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Meva1997"
              rel="noopener noreferrer"
              target="_blank"
              className="transition-transform hover:scale-105"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="px-4">
          <p className="text-center text-sm text-black dark:text-gray-400">
            This is a personal project created to showcase my skills and
            portfolio work. It is not affiliated with any company or
            organization and is provided for demonstration purposes only.
          </p>
        </div>

        <p className="text-center text-black dark:text-gray-400">
          © {new Date().getFullYear()} Alejandro Medina. All rights reserved.
        </p>
      </footer>
    </>
  );
}
