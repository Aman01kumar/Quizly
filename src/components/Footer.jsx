import React from "react";

export default function Footer() {
  return (
    <footer
      className="
        mt-10 
        relative overflow-hidden
        bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30
        dark:from-gray-800/80 dark:via-gray-900/80 dark:to-gray-950/80
        backdrop-blur-md border-t border-white/20 dark:border-gray-700
        py-6 text-center shadow-inner
        animate-footer-shimmer
      "
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 relative z-10">
        Built with{" "}
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">React</span>,{" "}
        <span className="font-semibold text-purple-600 dark:text-purple-400">Vite</span>,{" "}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">Tailwind CSS</span> — 
        <span className="ml-1 font-bold text-indigo-700 dark:text-indigo-300">Quizly</span>
      </p>
    </footer>
  );
}
