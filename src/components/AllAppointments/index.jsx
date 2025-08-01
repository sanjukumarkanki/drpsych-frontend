import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import AllAppointementsCard from "../AllAppointementsCard";
import Popup from "reactjs-popup";
import { RxCross2 } from "react-icons/rx";
import "../../App.css";
import { useEffect } from "react";
import { webUrl } from "../../common";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

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
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const { getOptions } = useContext(AppContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${webUrl}/api/sessions`,
          getOptions("GET")
        );
        if (response?.ok) {
          const data = await response.json();
          setAppointments(data?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error("Failed To Fecth", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
  };

  let filteredAppointments = [];
  if (appointments?.length) {
    filteredAppointments = appointments?.filter((appt) => {
      const matchesStatus = statusFilter === "" || appt.status === statusFilter;
      const matchesDate =
        selectedDate === "" || formatDate(appt.sessionDate) === selectedDate;
      return matchesStatus && matchesDate;
    });
  }

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
            <option value="pending">Pending</option>
            <option value="ccmpleted">Completed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="rescheduled">Rescheduled</option>
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
              <th>User Name</th>
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
              <>
                {isLoading ? (
                  <TailSpin width={30} height={30} />
                ) : (
                  filteredAppointments.map((appt) => (
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
              </>
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
