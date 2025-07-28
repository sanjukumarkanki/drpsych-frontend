import React, { useState } from "react";
import "./index.css"; // assuming you save styles as Faqs.css
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const faqs = [
  {
    question: "What kinds of therapists are available on Dr.Psych?",
    answer:
      "We have trained counselors, psychologists, and psychiatrists — each vetted for experience, empathy, and expertise in areas like stress, anxiety, depression, relationships, trauma, and more.",
  },
  {
    question: "Can I do all my sessions online?",
    answer:
      "Yes. Everything from assessments to therapy and psychiatry is done virtually — securely, via video.",
  },
  {
    question: "What makes Dr.Psych different?",
    answer:
      "Affordability. Language access. Human therapists who actually care. We’re here for real people, not just app users.",
  },
  {
    question: "Do you offer medication support?",
    answer:
      "Yes. If needed, certified psychiatrists can provide online consultations and prescribe medication legally and safely.",
  },
  {
    question: "How do I start?",
    answer:
      "Pick a time, make the payment, fill a short form, and we’ll take care of the rest. No complex forms. No confusion.",
  },
  {
    question: "Is my data protected?",
    answer:
      "Yes. All sessions are encrypted. We never share or sell your data.",
  },
  {
    question: "Do you offer support for teenagers?",
    answer:
      "Yes. We have therapists trained specifically for teen and young adult mental health.",
  },
  {
    question: "How much does therapy cost?",
    answer:
      "First session: ₹500. Regular sessions: ₹1000. Therapy plans are priced based on session count. All upfront — no hidden charges.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const half = Math.ceil(faqs.length / 2);
  const firstCol = faqs.slice(0, half);
  const secondCol = faqs.slice(half);

  const renderColumn = (items, offset = 0) =>
    items.map((faq, i) => {
      const index = i + offset;
      const isOpen = openIndex === index;

      return (
        <div className={`accordion-item ${isOpen ? "open" : ""}`} key={index}>
          <div className="accordion-title" onClick={() => handleToggle(index)}>
            <p>{faq.question}</p>
            <span className="arrow">
              {isOpen ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </div>
          <div className="accordion-content">{faq.answer}</div>
        </div>
      );
    });

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="accordion-main-container">
        <div className="accordion">{renderColumn(firstCol, 0)}</div>
        <div className="accordion">{renderColumn(secondCol, half)}</div>
      </div>
    </div>
  );
};

export default Faqs;
