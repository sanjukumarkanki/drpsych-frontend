import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import OtpVerification from "../../components/VerifyOtp";
import Cookies from "js-cookie";
import { webUrl } from "../../common";
import { TailSpin } from "react-loader-spinner";
import AppContext from "../../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${webUrl}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, loginType }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedOtp(data?.otp);
        setShowOTP(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOtp();
  };

  return (
    <div className={styles.wrapper} style={{ margin: "auto" }}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Login</h2>
          <input
            type="email"
            name="email"
            className={styles.nameInput}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button disabled={loading} type="submit" className={styles.button}>
            {loading ? (
              <TailSpin height={20} width={20} color="#fff" />
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
