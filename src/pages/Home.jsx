import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loadHighScores } from "../utils/storage.js";
import TipsCard from "../components/TipsCard.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [source, setSource] = useState("api");
  const [amount, setAmount] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");

  const highScores = loadHighScores();

  const start = () =>
    navigate("/quiz", {
      state: { source, amount: Number(amount), difficulty },
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-cyan-300 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto grid gap-8">
        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-400 p-8 text-white shadow-2xl">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🎯 Ready to test your knowledge?
          </h1>
          <p className="mt-2 text-white/90">
            Choose settings below and challenge yourself in a fun quiz!
          </p>
        </div>

        {/* Quiz Settings */}
        <div className="card bg-gradient-to-br from-white/90 via-indigo-50/80 to-purple-50/70 
                        dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-950/80">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            ⚙️ Quiz Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Select your preferences and hit start.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* Data Source */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Data Source
              </span>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1"
              >
                <option value="api">Open Trivia DB (online)</option>
                <option value="local">Local JSON (offline)</option>
              </select>
            </label>

            {/* Questions */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Questions
              </span>
              <input
                type="number"
                min={5}
                max={10}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </label>

            {/* Difficulty */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty
              </span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={start}
              className="btn btn-primary px-6 py-3 rounded-2xl hover:scale-105"
            >
              🚀 Start Quiz
            </button>
            <Link
              to="/quiz"
              state={{ source: "local", amount: 5, difficulty: "easy" }}
              className="btn btn-outline px-6 py-3 rounded-2xl hover:scale-105"
            >
              🎲 Try Sample
            </Link>
          </div>
        </div>

        {/* High Scores */}
        <div className="card bg-gradient-to-br from-white/90 via-indigo-50/80 to-purple-50/70 
                        dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-950/80">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            🏆 Top Scores
          </h3>
          {highScores.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              No scores yet.
            </p>
          ) : (
            <ol className="mt-3 space-y-2">
              {highScores.map((s, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                >
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {s.percent}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {s.correct}/{s.total}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Tips */}
        <TipsCard />
      </div>
    </div>
  );
}
