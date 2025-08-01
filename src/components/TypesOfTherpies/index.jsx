// File: TypesOfTherpies.jsx
import React, { useState } from "react";
import styles from "./index.module.css";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import BookAppointment from "../BookAppointment";

const therapyConfig = {
  assessment: { title: "First-Time Assessment", price: 500 },
  direct: { title: "One-on-One Therapy", price: 1000 },
  guided: { title: "Guided Therapy Plan", price: 1000 },
  teen: { title: "Teen Therapy (Under 18)", price: 0 },
};

export default function TypesOfTherpies() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState("book");
  const [popupProps, setPopupProps] = useState({});

  const openPopup = (type) => {
    setPopupProps({ ...therapyConfig[type], type });
    setPopupStep(type === "teen" ? "consent" : "book");
    setPopupOpen(true);
  };

  const renderCard = (type, icon, description, buttonText, cardClass) => (
    <div
      className={`${styles.card} ${cardClass}`}
      onClick={() => openPopup(type)}
    >
      <h3 className={styles.cardTitle}>{therapyConfig[type].title}</h3>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.price}>{buttonText}</button>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Therapy For A Better Life</h1>
      <p className={styles.description}>
        Find the kind of care that fits your needs.
      </p>

      <div className={styles.cards}>
        {renderCard(
          "assessment",
          "🩺",
          " 25-minute session with a therapist to understand your concerns and guide you on what’s next.",
          "₹500 / session",
          styles.lightBlue
        )}
        {renderCard(
          "direct",
          "📅",
          " Talk to a certified therapist for deeper work on specific challenges — stress, anxiety, relationships, anything.",
          "₹1000 / session",
          styles.lightGreen
        )}
        {renderCard(
          "guided",
          "📈",
          "Get a structured therapy roadmap based on your assessment. Designed for consistent growth.",
          "₹1000 / session • 3–10 sessions",
          styles.lightYellow
        )}
        {renderCard(
          "teen",
          "🔞",
          " Specialized support for adolescents. Sessions are safe, non-judgmental, and led by therapists trained in teen psychology.",
          "Parental consent required",
          styles.lightPeach
        )}
      </div>

      <Popup
        closeOnDocumentClick={false}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        modal
        nested
      >
        {popupStep === "consent" && (
          <div style={{ padding: 20 }}>
            <h3>Parental Consent Required</h3>
            <p>Confirm that a parent/guardian has provided consent.</p>
            <button onClick={() => setPopupStep("book")} style={buttonStyle}>
              I Have Consent
            </button>
          </div>
        )}

        {popupStep === "book" && (
          <BookAppointment
            title={popupProps.title}
            price={popupProps.price}
            type={popupProps.type}
            asPopup={true}
            onComplete={() => setPopupOpen(false)}
          />
        )}
      </Popup>
    </div>
  );
}

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#336780",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
