import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <FaBookOpen />
        <span>Courses</span>
      </Link>

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
