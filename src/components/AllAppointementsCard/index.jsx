import React from "react";
import styles from "../AllAppointments/index.module.css";

const AllAppointementsCard = ({
  key,
  setSelectedAppointment,
  appointment,
  formatTimeRange,
  statusClass,
  onStatusUpdate,
}) => {
  const { patientId, gmeetLink, sessionDate, status } = appointment;

  return (
    <tr key={key}>
      <td>
        <div className={styles.patientName}>
          <div className={styles.avatar}>
            {appointment?.patientId?.email
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </div>
          {patientId?.name || patientId?.email}
        </div>
      </td>
      <td className={styles.scheduletime}>{sessionDate}</td>
      <td>
        <span className={`${styles.statusBadge} ${statusClass(status)}`}>
          {appointment.status}
        </span>
      </td>
      <td>
        <a
          href={gmeetLink}
          target="_blank"
          rel="noreferrer"
          className={styles.joinBtn}
        >
          Join
        </a>
      </td>
      <td>
        <button
          className={styles.editBtn}
          onClick={() => setSelectedAppointment(appointment)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default AllAppointementsCard;
