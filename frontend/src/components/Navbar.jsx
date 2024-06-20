import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <div className="flex items-center gap-2 font-bold text-lg">
        <BookOpenIcon className="w-6 h-6" />
        <span>Courses</span>
      </div>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          to="/"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Courses
        </Link>
        <Link
          to="/dashboard"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
