import React from "react";
import styles from "./index.module.css";
import { FaUsers } from "react-icons/fa";
import AppointmentsList from "../../components/AppointmentsList";

const TherapistDashboard = () => {
  return (
    <div className={styles.therapistDashboard}>
      <div className={styles.dashboardBanner}>
        <img
          className={styles.therapistDashboardImage}
          src="https://i.pinimg.com/736x/26/45/c5/2645c5de51ce043e2b8242b23f8b9fa1.jpg"
          alt=""
        />
        <div className={styles.dashboardTextContainer}>
          <h2 className={styles.dashboardTitle}>Hey Doctor!</h2>
          <p className={styles.dashboardSubTitle}>
            Welcome back to your therapy panel.
          </p>
          <p className={styles.dashboardSubTitle}>
            You’re doing amazing work — your next session details and client
            updates will appear here.
          </p>
          <p className={styles.dashboardSubTitle}>
            Let’s continue making a difference, one session at a time.
          </p>
        </div>
      </div>

      {/* No.of Appointments */}
      <div className={styles.appointmentsContainer}>
        <div className={styles.appointmentsContainerCards}>
          <div className={styles.appointmentsContainerCard}>
            <div className={styles.appointmentTextContainer}>
              <div className={styles.CardImageContaienr}>
                <FaUsers />
              </div>
              <span>150</span>
            </div>
            <p>Total Sessions</p>
          </div>

          <div className={styles.appointmentsContainerCard}>
            <div className={styles.appointmentTextContainer}>
              <div className={styles.CardImageContaienr}>
                <FaUsers />
              </div>
              <span>200</span>
            </div>
            <p>Scheduled Sessions</p>
          </div>
          <div className={styles.appointmentsContainerCard}>
            <div className={styles.appointmentTextContainer}>
              <div className={styles.CardImageContaienr}>
                <FaUsers />
              </div>
              <span>20</span>
            </div>
            <p>Today's Sessions</p>
          </div>
        </div>
      </div>
      {/* Appointment List */}
      <AppointmentsList />
    </div>
  );
};

export default TherapistDashboard;
