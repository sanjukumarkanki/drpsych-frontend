import React from "react";
import styles from "./index.module.css"; // Adjust the path if needed

const BookAnAppointment = () => {
  return (
    <section className={styles.bookAppointmentContainer}>
      <div className={styles.bookAppointmentContainerLeft}>
        <h2>
          Book Appointment
          <br />
          With 100+ Trusted Doctors
        </h2>
        <button>Book Appointment</button>
      </div>
      <div className={styles.bookAppointmentContainerRight}>
        <img
          src="https://res.cloudinary.com/dnahum2gw/image/upload/v1751799111/appointment-doc-img_rlbmrq.webp"
          loading="lazy"
          alt="doctor image"
        />
      </div>
    </section>
  );
};

export default BookAnAppointment;
