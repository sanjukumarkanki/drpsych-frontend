import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { TailSpin } from "react-loader-spinner";

const OtpVerification = ({ email, handleVerifyOtp, resendOtpApi }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isResendDisabled) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const updateOtp = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        updateOtp(index, "");
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return alert("Please enter full OTP");
    setLoading(true);
    await handleVerifyOtp(enteredOtp);
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (isResendDisabled) return;
    setIsResendDisabled(true);
    setTimer(30);
    await resendOtpApi();
  };

  return (
    <div className={styles.otpContainer}>
      <h2 className={styles.title}>OTP Verification</h2>
      <p className={styles.description}>
        Enter the OTP sent to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.otpBoxes}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              ref={el => inputRefs.current[index] = el}
              className={styles.otpInput}
              value={digit}
              onChange={e => updateOtp(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <div className={styles.resendContainer}>
          {isResendDisabled ? (
            <span className={styles.description}>
              Resend available in <strong>{timer}s</strong>
            </span>
          ) : (
            <button type="button" className={styles.resendBtn} onClick={handleResendOtp}>
              Resend OTP
            </button>
          )}
        </div>

        <button type="submit" className={styles.verifyButton} disabled={loading}>
          {loading ? <TailSpin height={20} width={20} /> : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
