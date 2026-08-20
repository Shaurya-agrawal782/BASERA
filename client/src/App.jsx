import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScrollProvider from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";

// Route Code-Splitting via React.lazy
const HomePage = lazy(() => import("./pages/HomePage"));
const StaysPage = lazy(() => import("./pages/StaysPage"));
const ShowListingPage = lazy(() => import("./pages/ShowListingPage"));
const NewListingPage = lazy(() => import("./pages/NewListingPage"));
const EditListingPage = lazy(() => import("./pages/EditListingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Page Transition Animation Wrapper
const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Fallback Loading Component
const PageLoadingFallback = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
    }}
  >
    <div
      style={{
        width: "38px",
        height: "38px",
        border: "3px solid rgba(217, 119, 6, 0.2)",
        borderTopColor: "var(--primary-brand, #d97706)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <span
      style={{
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted, #94a3b8)",
      }}
    >
      Basera Sanctuary
    </span>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <SmoothScrollProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            borderRadius: "14px",
            background: "#0f172a",
            color: "#ffffff",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "12px 18px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<PageLoadingFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransitionWrapper>
                    <HomePage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/stays"
                element={
                  <PageTransitionWrapper>
                    <StaysPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/listings"
                element={
                  <PageTransitionWrapper>
                    <StaysPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/listings/new"
                element={
                  <PageTransitionWrapper>
                    <NewListingPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/listings/:id"
                element={
                  <PageTransitionWrapper>
                    <ShowListingPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/listings/:id/edit"
                element={
                  <PageTransitionWrapper>
                    <EditListingPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/login"
                element={
                  <PageTransitionWrapper>
                    <LoginPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/signup"
                element={
                  <PageTransitionWrapper>
                    <SignupPage />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransitionWrapper>
                    <NotFoundPage />
                  </PageTransitionWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}

export default App;
