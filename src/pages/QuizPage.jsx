import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestions, saveScore } from "../utils/questions.js";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";

export default function QuizPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const amount = state?.amount ?? 10;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- load questions ---
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const qset = await fetchQuestions(amount);
        setQuestions(qset);
        setSelections(Array(qset.length).fill(null));
      } catch (err) {
        console.error("❌ Failed to load questions", err);
        setQuestions([]);
        setSelections([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [amount]);

  // --- timer ---
  useEffect(() => {
    if (!questions.length) return;
    if (timeLeft <= 0) {
      handleNext(true); // auto move if time runs out
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, questions.length]);

  const onSelect = (index) => {
    setSelections((prev) => {
      const next = [...prev];
      next[current] = index;
      return next;
    });
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setTimeLeft(30);
    }
  };

  const handleNext = (auto = false) => {
    if (!auto && selections[current] === null) return;
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(30);
    } else {
      setShowConfirm(true);
    }
  };

  const handleSaveProgress = () => {
    localStorage.setItem(
      "quiz-progress",
      JSON.stringify({ current, selections })
    );
    alert("✅ Progress saved! You can resume later.");
  };

  const finishQuiz = () => {
    const detail = questions.map((q, i) => {
      const selectedIndex = selections[i];
      const isCorrect = selectedIndex === q.correctIndex;
      return { ...q, selectedIndex, isCorrect };
    });

    const correctCount = detail.filter((d) => d.isCorrect).length;
    const result = {
      correct: correctCount,
      total: questions.length,
      percent: Math.round((correctCount / questions.length) * 100),
      questions,
      answers: selections,
      detail,
      date: new Date().toISOString(),
    };

    saveScore(result);
    navigate("/results", { state: result });
  };

  const unanswered = selections.filter((s) => s === null).length;

  const progress = useMemo(
    () => (questions.length ? ((current + 1) / questions.length) * 100 : 0),
    [current, questions.length]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-700">
        ⏳ Loading questions...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-xl font-semibold">No questions available</h2>
        <p className="mt-2 text-gray-600">Try again later.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          ⟵ Back Home
        </button>
      </div>
    );
  }

  const q = questions[current];
  const selectedIndex = selections[current];

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gradient-to-br from-indigo-500 via-purple-400 to-cyan-400">
      <div className="max-w-3xl mx-auto grid gap-6">
        {/* Progress + Timer */}
        <div className="rounded-xl bg-white p-4 shadow">
          <ProgressBar value={progress} />
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>
              Question {current + 1} / {questions.length}
            </span>
            <span>⏱ {timeLeft}s</span>
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={q}
          selectedIndex={selectedIndex}
          locked={false} // ✅ don’t reveal answers yet
          onSelect={onSelect}
        />

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            ⟵ Previous
          </button>

          <button
            onClick={handleSaveProgress}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            💾 Save
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={() => handleNext(false)}
              disabled={selectedIndex === null}
              className={`rounded px-6 py-2 text-white ${
                selectedIndex === null
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              Next ⟶
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            >
              Finish ✅
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Submit Quiz?</h2>
            <p className="mb-4">
              You still have <strong>{unanswered}</strong> unanswered question
              {unanswered !== 1 ? "s" : ""}.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                ⟵ Return
              </button>
              <button
                onClick={finishQuiz}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                ✅ Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
