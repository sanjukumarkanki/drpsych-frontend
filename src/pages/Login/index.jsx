import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import OtpVerification from "../../components/VerifyOtp";
import Cookies from "js-cookie";
import { webUrl } from "../../common";
import { TailSpin } from "react-loader-spinner";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loginType, setLoginType] = useState("user"); // 'user' or 'therapist'
  const [showOTP, setShowOTP] = useState(false);

  const [loading, setIsLoading] = useState(false);
  const { setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${webUrl}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, loginType: loginType }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Otp Sent Successfully");
        setShowOTP(true);
      } else {
        const data = await res.json();
        console.log(data);
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error("Something Went Wrong", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOtp();
  };

  const handleVerifyOtp = async (otp) => {
    try {
      const res = await fetch(`${webUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode: otp, loginType }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("authToken", JSON.stringify(data), { expires: 7 });
        setUserData(data.user);
        toast.success("Login Success");
        if (data?.user?.role === "user") {
          navigate("/");
        } else {
          navigate("/therapist-dashboard");
        }
      } else {
        toast.success("Login Failed");
      }
    } catch (err) {
      toast.success("Login error:", err);
    }
  };

  return (
    <div className={styles.wrapper} style={{ margin: "auto" }}>
      <div className={styles.container}>
        {!showOTP ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>
              {loginType === "user" ? "User" : "Therapist"} <span>Login</span>
            </h2>
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

            <p className={styles.loginText}>
              Login As
              <span
                onClick={() =>
                  setLoginType(loginType === "user" ? "therapist" : "user")
                }
              >
                {loginType === "user" ? "Therapist" : "User"}
              </span>
            </p>
            {loginType === "user" && (
              <p className={styles.loginText}>
                Don't You Have An Account
                <span onClick={() => navigate("/register")}>Register</span>
              </p>
            )}
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
