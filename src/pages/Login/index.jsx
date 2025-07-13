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
        body: JSON.stringify({ email }),
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

  const handleVerifyOtp = async (otp) => {
    if (otp === generatedOtp) {
      try {
        const res = await fetch(`${webUrl}/api/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otpCode: otp }),
        });

        if (res.ok) {
          const data = await res.json();
          Cookies.set("authToken", JSON.stringify(data), { expires: 7 });
          setUserData(data.user);
          navigate("/home");
        } else {
          alert("Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className={styles.wrapper} style={{margin : 'auto'}}>
      <div className={styles.container}>
        {!showOTP ? (
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
        ) : (
          <OtpVerification
            email={email}
            handleVerifyOtp={handleVerifyOtp}
            resendOtpApi={sendOtp}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
