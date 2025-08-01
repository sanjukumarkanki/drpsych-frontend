// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { parsifiedData } from "../common"; // your existing token parser

export const useAuth = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = parsifiedData; // From localStorage or Cookies
    console.log(token, "token");
    if (token && token.token) {
      setUserData(token);
    } else {
      setUserData(null);
    }
  }, []);

  return { userData, setUserData };
};
