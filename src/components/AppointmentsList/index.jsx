import React from "react";
import styles from "./index.module.css";

const appointments = [
  {
    username: "Ananya Sharma",
    scheduledAt: "2025-07-20T10:30:00",
    sessionType: "Individual Therapy",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    username: "Rahul Mehta",
    scheduledAt: "2025-07-20T12:00:00",
    sessionType: "Teen Therapy",
    meetLink: "https://meet.google.com/jkl-mnop-qr",
  },
  {
    username: "Drishti Verma",
    scheduledAt: "2025-07-20T15:00:00",
    sessionType: "Couple Therapy",
    meetLink: "https://meet.google.com/stu-vwxy-z",
  },
  {
    username: "Kabir Anand",
    scheduledAt: "2025-07-21T11:15:00",
    sessionType: "Psychiatric Evaluation",
    meetLink: "https://meet.google.com/qwe-rtyu-op",
  },
  {
    username: "Sana Qureshi",
    scheduledAt: "2025-07-21T17:45:00",
    sessionType: "Guided Therapy Plan",
    meetLink: "https://meet.google.com/zxc-vbnm-lk",
  },
];

const formatDate = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getAvatar = (name) => {
  const parts = name.trim().split(" ");
  const firstInitial = parts[0]?.charAt(0) || "";
  const secondInitial = parts[1]?.charAt(0) || "";
  return (firstInitial + secondInitial).toUpperCase();
};

const getColorFromName = (name) => {
  const colors = [
    "#007bff",
    "#e91e63",
    "#9c27b0",
    "#4caf50",
    "#f44336",
    "#ff9800",
    "#3f51b5",
    "#009688",
    "#795548",
    "#673ab7",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const AppointmentsList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textcontainer}>
        <h2 className={styles.heading}>Upcoming Appointments</h2>
        <a href="" className={styles.viewAlltext}>
            View All
        </a>
      </div>
      <div className={styles.caardsContainer}>
        {appointments.map((appt, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardProfileContainer}>
              <div
                className={styles.avatar}
                style={{ backgroundColor: getColorFromName(appt.username) }}
              >
                {getAvatar(appt.username)}
              </div>
              <div className={styles.details}>
                <div className={styles.name}>{appt.username}</div>
                <div className={styles.datetime}>
                  {formatDate(appt.scheduledAt)} at{" "}
                  {formatTime(appt.scheduledAt)}
                </div>
                <div className={styles.sessionType}>{appt.sessionType}</div>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.viewButton}>View</button>
              <a
                href={appt.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.joinLink}
              >
                Join Meet
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
