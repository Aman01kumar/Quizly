// ----------------- Question Helpers -----------------
export function shuffle(arr) {
  if (!Array.isArray(arr)) return [];
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function decodeHTML(html) {
  if (typeof html !== "string") return "";
  try {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(html, "text/html");
    return decoded.documentElement.textContent || "";
  } catch {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
}

// Normalize API response safely
export function normalizeOpenTDB(results) {
  if (!Array.isArray(results)) return [];

  return results.map((q, idx) => {
    const correct = decodeHTML(q?.correct_answer || "");
    const incorrect = Array.isArray(q?.incorrect_answers)
      ? q.incorrect_answers.map(decodeHTML)
      : [];

    const answers = shuffle([correct, ...incorrect]);
    const correctIndex = answers.findIndex((a) => a === correct);

    return {
      id: `${q?.category || "General"}-${q?.difficulty || "easy"}-${idx}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      question: decodeHTML(q?.question || "Untitled Question"),
      options: answers.length ? answers : ["N/A"],
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
      difficulty: q?.difficulty || "easy",
      category: q?.category || "General",
    };
  });
}

// ----------------- Local Fallback Questions -----------------
export const localQuestions = [
  {
    id: "l1",
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctIndex: 3,
    difficulty: "easy",
    category: "Technology",
  },
  {
    id: "l2",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Geography",
  },
  {
    id: "l3",
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Art",
  },
  {
    id: "l4",
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperText Transmission Package",
      "Hyper Transfer Text Process",
    ],
    correctIndex: 0,
    difficulty: "medium",
    category: "Technology",
  },
  {
    id: "l5",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Space",
  },
  {
    id: "l6",
    question: "Which data structure uses FIFO order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
    difficulty: "medium",
    category: "Computer Science",
  },
  {
    id: "l7",
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    correctIndex: 1,
    difficulty: "medium",
    category: "History",
  },
  {
    id: "l8",
    question: "Which is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Biology",
  },
  {
    id: "l9",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"],
    correctIndex: 0,
    difficulty: "easy",
    category: "Literature",
  },
  {
    id: "l10",
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Science",
  },
  {
    id: "l11",
    question: "Which gas do humans exhale when breathing?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Biology",
  },
  {
    id: "l12",
    question: "What is the currency of Japan?",
    options: ["Won", "Dollar", "Yen", "Yuan"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Economics",
  },
  {
    id: "l13",
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Opal"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Chemistry",
  },
  {
    id: "l14",
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "Australia", "South America"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Geography",
  },
  {
    id: "l15",
    question: "Who is known as the 'Father of Computers'?",
    options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Bill Gates"],
    correctIndex: 1,
    difficulty: "medium",
    category: "Technology",
  },
  {
    id: "l16",
    question: "How many players are there in a cricket team?",
    options: ["9", "10", "11", "12"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Sports",
  },
  {
    id: "l17",
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Mathematics",
  },
  {
    id: "l18",
    question: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctIndex: 2,
    difficulty: "easy",
    category: "Geography",
  },
  {
    id: "l19",
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctIndex: 1,
    difficulty: "easy",
    category: "Science",
  },
  {
    id: "l20",
    question: "Which programming language is used for Android app development?",
    options: ["Python", "Kotlin", "Swift", "Ruby"],
    correctIndex: 1,
    difficulty: "medium",
    category: "Technology",
  },
];

// ----------------- Fetch Questions -----------------
export async function fetchQuestions(amount = 10) {
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`API request failed (status ${res.status})`);
    }

    const data = await res.json();
    if (!data?.results?.length) {
      throw new Error("No questions returned from API");
    }

    return normalizeOpenTDB(data.results).slice(0, amount);
  } catch (error) {
    console.warn("⚠️ Falling back to local questions:", error.message);
    return shuffle(localQuestions).slice(0, amount);
  }
}

// ----------------- High Scores -----------------
const KEY = "quizly_highscores_v1";

/**
 * Load high scores from localStorage
 * @returns {Array} high score entries
 */
export function loadHighScores() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Save a new score into localStorage
 * Keeps only top 10 scores sorted by percent
 * @param {Object} entry - { correct, total, percent, date }
 */
export function saveScore(entry) {
  if (!entry || typeof entry.percent !== "number") return;

  const scores = loadHighScores();
  scores.push(entry);

  // Sort by percent (descending), then date (newest first)
  scores.sort((a, b) => {
    if (b.percent !== a.percent) return b.percent - a.percent;
    return new Date(b.date) - new Date(a.date);
  });

  // Keep top 10
  localStorage.setItem(KEY, JSON.stringify(scores.slice(0, 10)));
}
