import React, { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./index.css";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const generateTimeSlots = (startTime = "08:00", endTime = "17:00") => {
  const slots = [];
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (start < end) {
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const isPM = hours >= 12;
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const ampm = isPM ? "PM" : "AM";
    slots.push(`${formattedHour}:${formattedMinutes} ${ampm}`);
    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const DoctorAvailabilitySelector = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimesByDate, setSelectedTimesByDate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AppContext);

  const toggleTimeSlot = (dateStr, time) => {
    setSelectedTimesByDate((prev) => {
      const current = prev[dateStr] || [];
      const updated = current.includes(time)
        ? current.filter((t) => t !== time)
        : [...current, time];
      return { ...prev, [dateStr]: updated };
    });
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSubmit = async () => {
    // Replace with real ID
    const therapistId = userData?.user?._id;

    const finalAvailability = Object.entries(selectedTimesByDate).map(
      ([date, times]) => ({
        date,
        timeSlots: times.map((time) => ({ time, isBooked: false })),
      })
    );

    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3005/api/therapist-availability/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            therapistId,
            availability: finalAvailability,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Availability saved successfully!");
        setSelectedDates([]);
        setSelectedTimesByDate({});
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.err("Error: " + data.error);
      } 
    } catch (err) {
      toast.error("Submission failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>Select Available Dates</h2>
      <div className="doctorAvailabilityContainer">
        <div className="leftCalendar">
          <DayPicker
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
          />
        </div>

        <div className="rightSlots">
          {selectedDates.map((date) => {
            const dateStr = formatDate(date);
            return (
              <div key={dateStr} className="datetimeSelector">
                <h3>{dateStr}</h3>
                <div className="timeSlotContainer">
                  {TIME_SLOTS.map((time) => {
                    const isSelected =
                      selectedTimesByDate[dateStr]?.includes(time);
                    return (
                      <button
                        key={time}
                        onClick={() => toggleTimeSlot(dateStr, time)}
                        className={`timeSlotBtn ${
                          isSelected ? "selected" : ""
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {selectedDates.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <button
                disabled={isLoading}
                className="saveBtn"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <TailSpin width={30} height={20} color="#fff" />
                ) : (
                  " Save Availability"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorAvailabilitySelector;
