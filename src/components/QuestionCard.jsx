import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({
  question,       // {question, options, correctIndex}
  selectedIndex,  // number or null
  locked = false, // ✅ stays false until quiz is submitted
  onSelect,       // (index) => void
}) {
  return (
    <motion.div
      key={question.question}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="card space-y-5 fade-in"
    >
      {/* Question Text */}
      <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-100">
        {question.question}
      </h2>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;

          // ✅ Apply correct/wrong styles ONLY when locked
          const isCorrect = locked && i === question.correctIndex;
          const isWrong = locked && isSelected && i !== question.correctIndex;

          return (
            <motion.button
              key={`${opt}-${i}`}
              whileTap={{ scale: 0.96 }}
              onClick={() => !locked && onSelect(i)} // ✅ prevent selection after locked
              disabled={locked}
              aria-pressed={isSelected}
              className={[
                "w-full text-left rounded-xl px-4 py-3 transition-all duration-200 shadow-sm",
                "border bg-white dark:bg-gray-800",
                "hover:scale-[1.02] hover:shadow-md focus:outline-none",

                // Highlight selected only if not locked yet
                isSelected && !locked
                  ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/40"
                  : "",

                // Show green/red only after locked
                isCorrect
                  ? "border-green-500 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-900/40 dark:text-green-300"
                  : "",
                isWrong
                  ? "border-red-500 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-900/40 dark:text-red-300"
                  : "",

                // Neutral style
                !isCorrect && !isWrong && !isSelected
                  ? "text-gray-800 dark:text-gray-200"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                {/* ✅ Show icons only after locked */}
                {locked && isCorrect && <span role="img" aria-label="Correct">✅</span>}
                {locked && isWrong && <span role="img" aria-label="Wrong">❌</span>}
                <span>{opt}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
