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
  return (
    <tr key={key}>
      <td>
        <div className={styles.patientName}>
          <div className={styles.avatar}>
            {appointment.username
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </div>
          {appointment.username}
        </div>
      </td>
      <td className={styles.scheduletime}>
        {formatTimeRange(appointment.scheduledAt)}
      </td>
      <td>
        <span
          className={`${styles.statusBadge} ${statusClass(appointment.status)}`}
        >
          {appointment.status}
        </span>
      </td>
      <td>
        <a
          href={appointment.meetLink}
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
