// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import socket from "./utils/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuthStore from "./stores/authStore";
import { useEffect } from "react";
import Cookies from "js-cookie"; // ✅ CORRECT

import { useState } from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/index.jsx";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register";
import AppContext from "./context/AppContext";
import { parsifiedData } from "./common/index.js";
import PayButton from "./components/PayButton/index.jsx";
import Sidebar from "./components/Sidebar/index.jsx";

import "./App.css";
import TherpistDashboard from "./pages/TherpistDashboard/index.jsx";
import AllAppointments from "./components/AllAppointments/index.jsx";
import TherapistRegistration from "./pages/TherapistRegistration/index.jsx";
import ThankYou from "./pages/Thankyou/index.jsx";
import TherapistLogin from "./pages/TherapistLogin/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import AvailabilityForm from "./components/Availability/index.jsx";
// import AOS from "aos";
// import "aos/dist/aos.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("");
  const location = useLocation();
  const showNavbarRoutes = [
    "/",
    "/login",
    "/register",
    "/aboutus",
    "/contactus",
    "/about",
    "/services",
    "/contact",
    "/therapist-registration",
  ];
  const showNavbar = showNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const token = parsifiedData;
    if (token) {
      setUserData(token);
    }
  }, []);

  const getOptions = (
    method,
    data = {},
    token_needed = true,
    isFile = false
  ) => {
    let token = userData?.token;
    let obj = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: !isFile ? JSON.stringify(data) : data,
    };
    if (method === "GET") {
      delete obj.body;
    }
    if (token_needed) {
      obj.headers["Authorization"] = `Bearer ${token}`;
    }
    if (isFile) {
      delete obj.headers["Content-Type"];
      obj.headers["Accept"] = "application/json";
    }
    return obj;
  };

  return (
    <div
      className="appContainer"
      style={{
        display: "flex",
        flexDirection: !showNavbar ? "row" : "column",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <AppContext.Provider value={{ getOptions, userData, setUserData }}>
        {showNavbar && <Navbar />}
        {!showNavbar && <Sidebar />}
        <div
          className={
            !showNavbar ? "dashboard-wrapper app-wrapper" : "app-wrapper"
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/therapist-registration"
              element={<TherapistRegistration />}
            />
            <Route path="/thnak-you" element={<ThankYou />} />
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute requiredRole="therapist">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapist-dashboard"
              element={<TherpistDashboard />}
            />
            <Route path="/availability" element={<AvailabilityForm />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/payment" element={<PayButton />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}
