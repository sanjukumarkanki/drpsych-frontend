// Optimized Register.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import OtpVerification from "../../components/VerifyOtp";
import Cookies from "js-cookie";
import { webUrl, parsifiedData } from "../../common";
import { TailSpin } from "react-loader-spinner";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    language: "",
    description: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(AppContext);

  useEffect(() => {
    if (parsifiedData?.token) navigate("/home");
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${webUrl}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, loginType: "user" }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedOtp(data?.otp);
        setShowOTP(true);
      } else alert("Failed to send OTP");
    } catch (err) {
      console.error("OTP Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };

  const handleVerifyOtp = async (otp) => {
    if (otp !== generatedOtp) return toast.error("Invalid OTP");
    try {
      const res = await fetch(`${webUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otpCode: otp,
          loginType: "user",
        }),
      });

      if (res?.ok) {
        const data = await res.json();
        Cookies.set("authToken", JSON.stringify(data), { expires: 7 });
        setUserData(data?.user);
        toast.success("Login Success");
        navigate("/");
      } else {
        toast.error("Registration Failed");
      }
    } catch (err) {
      toast.error("Verification error:", err);
      console.error("Verification error:", err);
    }
  };

  const renderFormInputs = () => (
    <>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className={styles.nameInput}
        required
      />
      <input
        name="email"
        placeholder="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className={styles.nameInput}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        className={styles.nameInput}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={`${styles.customSelect} ${styles.nameInput}`}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <select
        name="language"
        value={formData.language}
        onChange={handleChange}
        className={`${styles.customSelect} ${styles.nameInput}`}
        required
      >
        <option value="">Preferred Language</option>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="telugu">Telugu</option>
        <option value="tamil">Tamil</option>
        <option value="kannada">Kannada</option>
      </select>
      <textarea
        name="description"
        placeholder="Tell us about yourself"
        value={formData.description}
        onChange={handleChange}
        className={styles.textareaInput}
        rows={4}
      />
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {!showOTP ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Register</h2>
            {renderFormInputs()}
            <button disabled={loading} type="submit" className={styles.button}>
              {loading ? (
                <TailSpin height={20} width={20} color="#fff" />
              ) : (
                "Send OTP"
              )}
            </button>
            <p className={styles.loginText}>
              Don't You Have An Account
              <span onClick={() => navigate("/login")}>Login Here</span>
            </p>
          </form>
        ) : (
          <OtpVerification
            email={formData.email}
            handleVerifyOtp={handleVerifyOtp}
            resendOtpApi={sendOtp}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
