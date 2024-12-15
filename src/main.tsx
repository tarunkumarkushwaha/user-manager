// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Signup from "./pages/Signup.tsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Analytics from "./pages/Analytics.tsx";
import Navbar from "./components/Navbar.tsx";
import Foot from "./components/Footer.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <App />
                <Foot />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Foot />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
                <Foot />
              </>
            }
          />
          <Route
            path="/analytics"
            element={
              <>
                <Navbar />
                <Analytics />
                <Foot />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <Signup />
                <Foot />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </Provider>
  </StrictMode>
);
