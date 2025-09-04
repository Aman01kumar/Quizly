import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard"; // ✅ adjust path if needed

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If user comes directly without quiz
  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          🚫 No results available
        </h2>
        <p className="mt-2 text-gray-600">Please take a quiz first.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          ⟵ Back Home
        </button>
      </div>
    );
  }

  const { correct, total, percent, questions, answers } = state;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 via-purple-400 to-cyan-400 p-6">
      {/* Score Summary */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎉 Quiz Completed!
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          You scored <span className="font-bold">{correct}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>
        <p
          className={`text-xl font-semibold mb-6 ${
            percent >= 70
              ? "text-green-600"
              : percent >= 40
              ? "text-orange-500"
              : "text-red-600"
          }`}
        >
          {percent}%
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            ⟵ Back Home
          </button>
          <button
            onClick={() => navigate("/quiz", { state: { amount: total } })}
            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            🔄 Retry Quiz
          </button>
        </div>
      </div>

      {/* Review Questions */}
      <div className="max-w-2xl w-full space-y-6">
        {questions?.map((q, i) => (
          <QuestionCard
            key={i}
            question={q}
            selectedIndex={answers[i]}
            locked={true} // ✅ force reveal answers only here
            onSelect={() => {}} // no-op
          />
        ))}
      </div>
    </div>
  );
}
