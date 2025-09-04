import React from "react";
import "../index.css";

export default function ProgressBar({ value }) {
  return (
    <div
      className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        style={{ width: `${value}%` }}
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 shadow-md transition-all duration-500 ease-out progress-animate"
      />
    </div>
  );
}
