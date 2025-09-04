const KEY = "quizly_highscores_v1";

/**
 * Load high scores from localStorage
 * @returns {Array} high score entries
 */
export function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save a new score into localStorage
 * Keeps only top 10 scores sorted by percent
 * @param {Object} entry - { name, score, percent, date }
 */
export function saveScore(entry) {
  const scores = loadHighScores();
  scores.push(entry);

  // Sort by percent (descending)
  scores.sort((a, b) => b.percent - a.percent);

  // Keep top 10
  localStorage.setItem(KEY, JSON.stringify(scores.slice(0, 10)));
}
