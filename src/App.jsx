import React, { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy load pages (better performance 🚀)
const Home = lazy(() => import('./pages/Home'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const ResultsPage = lazy(() => import('./pages/ResultsPage'))

// 404 Page
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="mt-3 text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
    </div>
  )
}

// Layout wrapper
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 fade-in">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-gray-500 animate-pulse">
            ⏳ Loading Quizly...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/quiz"
            element={
              <Layout>
                <QuizPage />
              </Layout>
            }
          />
          <Route
            path="/results"
            element={
              <Layout>
                <ResultsPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
