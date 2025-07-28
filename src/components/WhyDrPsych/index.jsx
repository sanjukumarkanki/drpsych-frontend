import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // Import your styles here

const contentData = [
  {
    label: "Instant Access",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707517/Group_1171275192_1_dgmbdo.png",
    title: "Why DrPsych Is Different – Instant Access",
    points: [
      "No Waiting: Book and talk to a therapist as soon as today.",
      "Always Available: Sessions during nights and weekends too.",
      "Crisis-Ready: When things get heavy, help is here.",
      "Immediate Relief: Therapy shouldn’t take weeks to begin.",
    ],
  },
  {
    label: "Smart & Secure",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707515/Group_1171275168_2_e1zpno.jpg",
    title: "Why DrPsych Is Different – Smart & Secure",
    points: [
      "AI-Based Matching: We help you find the right therapist from the start.",
      "Encrypted Sessions: Your privacy isn’t optional — it’s built in.",
      "Languages You Speak: English, Hindi, Tamil, Telugu, Kannada, and more.",
      "Data Safe by Design: Nothing leaves our secure system without your consent.",
    ],
  },
  {
    label: "Built for Real Life",
    image:
      "https://res.cloudinary.com/dnahum2gw/image/upload/v1751707515/Group_1171275191_1_pxmsag.png",
    title: "Why DrPsych Is Different – Built for Real Life",
    points: [
      "100% Virtual: No traffic. No waiting rooms.",
      "Affordable Pricing: Mental health help that doesn’t break the bank.",
      "For Everyone: Students, professionals, parents, seniors.",
      "Proven Outcomes: Measurable growth. Real change.",
    ],
  },
];


const WhyDrPsych = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleImageChange = (index) => {
    clearInterval(intervalRef.current); // Stop auto-rotation
    setImgIndex(index);
  };

  // Auto-rotate logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % contentData.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const currentData = contentData[imgIndex];

  return (
    <section data-aos="zoom-in" className="cion-model-section">
      <div className="cion-model-buttons">
        {contentData.map((item, i) => (
          <button
            key={i}
            className={`btn ${imgIndex === i ? "active" : ""}`}
            onClick={() => handleImageChange(i)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="cion-model-content">
        <div className="phone-frame">
          <img src={currentData.image} alt={`CION - ${currentData.label}`} />
        </div>
        <div className="model-info">
          <h2>{currentData.title}</h2>
          <ul>
            {currentData.points.map((point, i) => {
              const [title, desc] = point.split(":");
              return (
                <li key={i}>
                  <span>{title}:</span> {desc}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyDrPsych;
