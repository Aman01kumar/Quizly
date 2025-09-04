# 🎯 Quizly — React Quiz App

Quizly is a clean, responsive quiz application built with **React**, **Vite**, and **Tailwind CSS**.  
It lets you test your knowledge with fun quizzes, track your performance, and save your high scores locally.

---

## ✨ Features

- ✅ Fetches questions from the **Open Trivia DB API**  
- 📦 **Offline fallback**: uses local JSON if API is unavailable  
- ⏱ **30-second timer** per question with auto-lock  
- 📊 **Progress bar** with smooth animation  
- 🎚 Choose **difficulty** (Easy, Medium, Hard)  
- 🧮 Tracks **correct and incorrect** answers  
- 🏆 Saves top **10 high scores** in `localStorage`  
- 📱 **Responsive UI** (mobile-first) with dark mode support  

---

## 🚀 How It Works

### 1. **Home Page**
- Configure quiz settings (source, number of questions, difficulty).  
- Start the quiz or try a quick demo.  
- View saved **Top Scores**.

### 2. **Quiz Page**
- Shows one question at a time.  
- **30s countdown timer** per question.  
- User selects an answer → highlights **correct ✅ / incorrect ❌**.  
- Auto-advances when time runs out.  

### 3. **Results Page**
- Displays:
  - Total questions
  - Correct answers
  - Percentage score  
- Stores results in **local high scores**.

---

## 📦 Local Storage

High scores are stored under the key:

