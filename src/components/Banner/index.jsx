import React from "react";
import "./index.css";

const Banner = () => {
  return (
    <div class="banner d-flex flex-column justify-content-center align-items-center">
      <div class="banner__right-container">
        <div data-aos="zoom-in-up" class="banner__image-container">
          <img
            src="https://res.cloudinary.com/deo74k78q/image/upload/v1753627637/WhatsApp_Image_2025-07-27_at_8.16.21_PM_kmyb1e.jpg"
            class="banner__image"
            alt="banner image"
          />
        </div>
      </div>
      <div class="banner__left-container">
        <h1 data-aos="fade-left" class="banner__title">
          India's <span> Mental Health Therapy Hub</span> — Bringing Affordable,
          Accessible, and Always Here For You
        </h1>
        <p data-aos="fade-right" class="banner__description">
          Licensed therapists. Instant appointments. Sessions in your language.
          Whether you’re anxious, overwhelmed, or just need someone to talk to —
          Dr.Psych connects you to compassionate care from anywhere.
        </p>
        <div data-aos="fade-up" class="banner__btn-container d-flex">
          <button type="button" class="banner__talk-to-expert">
            Book An Appointment
          </button>
          <button type="button" class="banner__watch-our-video">
            <div>
              <i class="fa-solid fa-play"></i>
            </div>
            <span> Watch Our Video</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
