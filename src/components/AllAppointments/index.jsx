import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import AllAppointementsCard from "../AllAppointementsCard";
import Popup from "reactjs-popup";
import { RxCross2 } from "react-icons/rx";
import "../../App.css";

const appointmentsData = [
  {
    id: "#1234",
    username: "Ananya",
    scheduledAt: "2025-07-20T10:30:00",
    sessionType: "Individual Therapy",
    mobile: "+91 9876543210",
    status: "Accepted",
    meetLink: "https://meet.google.com/abc-defg-hij",
    userId: "user1",
  },
  {
    id: "#1235",
    username: "Rahul Mehta",
    scheduledAt: "2025-07-20T12:00:00",
    sessionType: "Teen Therapy",
    mobile: "+91 8765432190",
    status: "Cancelled",
    meetLink: "https://meet.google.com/jkl-mnop-qr",
    userId: "user2",
  },
  {
    id: "#1236",
    username: "Drishti Verma",
    scheduledAt: "2025-07-20T15:00:00",
    sessionType: "Couple Therapy",
    mobile: "+91 9988776655",
    status: "Rescheduled",
    meetLink: "https://meet.google.com/stu-vwxy-z",
    userId: "user3",
  },
];

const formatTimeRange = (start) => {
  const date = new Date(start);
  const pad = (num) => num.toString().padStart(2, "0");
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? pad(hours) : "12";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${hours}:${pad(date.getMinutes())} ${ampm}`;
};

const formatDate = (iso) => new Date(iso).toISOString().split("T")[0];

const statusClass = (status) => {
  switch (status) {
    case "Accepted":
      return styles.statusAccepted;
    case "Cancelled":
      return styles.statusCancelled;
    case "Rescheduled":
      return styles.statusRescheduled;
    case "Completed":
      return styles.statusCompleted;
    default:
      return "";
  }
};

const AppointmentsTable = () => {
  const dateRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState(appointmentsData);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  const handleStatusUpdate = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = statusFilter === "" || appt.status === statusFilter;
    const matchesDate =
      selectedDate === "" || formatDate(appt.scheduledAt) === selectedDate;
    return matchesStatus && matchesDate;
  });

  return (
    <>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>All Appointments</h2>
        <div className={styles.filters}>
          <select
            className={`${styles.statusFilter} customSelect`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Accepted</option>
            <option>Cancelled</option>
            <option>Rescheduled</option>
          </select>
          <button
            onClick={() => dateRef.current?.showPicker()}
            className={styles.selectDateBtn}
          >
            Select Date
          </button>
          <input
            ref={dateRef}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
          />
        </div>
      </div>

      <div className={styles.appointmentsWrapper}>
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Time</th>
              <th>Status</th>
              <th>Meet Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appt, index) => (
                <AllAppointementsCard
                  key={appt.id}
                  setSelectedAppointment={setSelectedAppointment}
                  appointment={appt}
                  formatTimeRange={formatTimeRange}
                  statusClass={statusClass}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </tbody>
        </table>

        <Popup
          modal
          closeOnDocumentClick={false}
          open={selectedAppointment !== ""}
          nested
        >
          {
            <div className={styles.popupContainer}>
              <button
                type="button"
                onClick={() => setSelectedAppointment("")}
                className="cancel-button"
              >
                <RxCross2 />
              </button>
              <h2 className={styles.popupHeading}>Edit Appointment</h2>
              <p>
                <strong>Patient:</strong> {selectedAppointment.username}
              </p>
              <p>
                <strong>Session:</strong> {selectedAppointment.sessionType}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedAppointment.mobile}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {formatTimeRange(selectedAppointment.scheduledAt)}
              </p>

              <p>
                <strong>Status:</strong>
                <select className={`${styles.statusDropdown} customSelect`}>
                  <option value="Accepted">Accepted</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </p>

              <div className={styles.popupActions}>
                <button
                  className={styles.saveBtn}
                  onClick={() => handleSave(close)}
                >
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setSelectedAppointment("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        </Popup>
      </div>
    </>
  );
};

export default AppointmentsTable;
