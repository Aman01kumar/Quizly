import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 🔹 Simple error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-red-50 text-red-700">
          <h1 className="text-3xl font-bold">⚠️ Something went wrong</h1>
          <p className="mt-2 text-gray-600">
            Please refresh the page and try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="h-screen flex flex-col items-center justify-center text-gray-600">
            <span className="text-lg animate-pulse">⏳ Loading...</span>
          </div>
        }
      >
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
