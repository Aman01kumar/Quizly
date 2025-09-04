import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 transition-all duration-500 ${
        isScrolled
          ? "py-2 shadow-lg bg-gradient-to-r from-indigo-700 via-blue-600 to-teal-600 backdrop-blur-xl"
          : "py-4 shadow-md bg-gradient-to-r from-indigo-700 via-blue-600 to-teal-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo with shimmer effect */}
        <Link
          to="/"
          className={`font-bold tracking-tight relative ${
            isScrolled ? "text-xl" : "text-2xl"
          } text-white`}
        >
          <span className="relative z-10">Quizly</span>
          {/* Shimmer effect behind text */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-600 to-blue-800 bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite] bg-clip-text text-transparent">
            Quizly
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-12 text-lg font-semibold tracking-wide">
          {[
            { name: "Home", path: "/" },
            { name: "Quiz", path: "/quiz" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-orange-400 hover:text-orange-500 transition group"
            >
              {item.name}
              {/* dark shimmer underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
