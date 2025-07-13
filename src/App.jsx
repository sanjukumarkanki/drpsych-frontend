// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import socket from "./utils/socket";

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
// import AOS from "aos";
// import "aos/dist/aos.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("");

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

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: false,
  //   });
  // }, []);

  // utils/auth.js

  return (
    <div className={styles.appContainer}>
      <AppContext.Provider value={{ getOptions, userData, setUserData }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/payment" element={<PayButton />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
