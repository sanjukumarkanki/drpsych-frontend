import React from "react";
import styles from "./index.module.css";

const ThankYouPage = () => {
  const sentEmail = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h1 className={styles.title}>Registration Successful!</h1>
        <p className={styles.subtitle}>
          Thank you for registering as a therapist on DrPsych.
        </p>
        <p className={styles.subtitle}>
          Our team will review your profile shortly. Once approved, you'll be
          able to access your dashboard and begin your journey.
        </p>
        <button
          className={styles.button}
          onClick={() => (window.location.href = "/home")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
