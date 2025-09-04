import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // using lucide-react icons

export default function TipsCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="card bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-6 fade-in">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          💡 Pro Tips
        </h3>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Content */}
      {open && (
        <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300 transition-all duration-300">
          <li>
            Use{" "}
            <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">
              Tab
            </kbd>{" "}
            to navigate and{" "}
            <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">
              Enter
            </kbd>{" "}
            or{" "}
            <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">
              Space
            </kbd>{" "}
            to select answers.
          </li>
          <li>
            ⏱ Each question has a{" "}
            <span className="font-semibold">30s timer</span> that auto-locks if
            unanswered.
          </li>
          <li>
            🏆 Your best scores are{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              saved locally
            </span>{" "}
            in your browser.
          </li>
        </ul>
      )}
    </div>
  );
}
