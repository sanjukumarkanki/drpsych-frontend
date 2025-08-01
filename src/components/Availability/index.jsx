import React, { useContext, useEffect, useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { format, startOfToday } from "date-fns";

import "react-day-picker/dist/style.css";
import "./index.css";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { webUrl } from "../../common";

// Generate time slots
const generateTimeSlots = (start = "08:00", end = "17:00") => {
  const slots = [];
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);
  while (startTime < endTime) {
    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    slots.push(`${formattedHour}:${formattedMinutes} ${ampm}`);
    startTime.setMinutes(startTime.getMinutes() + 30);
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const DoctorAvailabilitySelector = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimesByDate, setSelectedTimesByDate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [therapistAvailability, setTherapistAvailability] = useState([]);
  const { userData, getOptions } = useContext(AppContext);

  // Fetch availability once
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${webUrl}/api/therapist-availability/availability-by-id`,
          getOptions("POST", { therapistId: userData?.user?._id })
        );
        if (response.ok) {
          const data = await response.json();
          setTherapistAvailability(data?.data || []);
        } else {
          throw new Error();
        }
      } catch {
        toast.error("Failed to get available dates");
      }
    };
    fetchAvailability();
  }, [userData]);

  // Create a Map for fast slot access
  const availabilityMap = useMemo(() => {
    const map = new Map();
    therapistAvailability.forEach(({ date, slots }) => {
      const dateKey = format(new Date(date), "yyyy-MM-dd");
      map.set(
        dateKey,
        slots.map((s) => s.time)
      );
    });
    return map;
  }, [therapistAvailability]);

  const toggleTimeSlot = (dateStr, time) => {
    setSelectedTimesByDate((prev) => {
      const updated = prev[dateStr]?.includes(time)
        ? prev[dateStr].filter((t) => t !== time)
        : [...(prev[dateStr] || []), time];
      return { ...prev, [dateStr]: updated };
    });
  };

  const handleSubmit = async () => {
    const therapistId = userData?.user?._id;
    const availability = Object.entries(selectedTimesByDate).map(
      ([date, times]) => ({
        date,
        timeSlots: times.map((time) => ({ time, isBooked: false })),
      })
    );

    try {
      setIsLoading(true);
      const res = await fetch(`${webUrl}/api/therapist-availability/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapistId, availability }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Availability saved successfully!");
        setSelectedDates([]);
        setSelectedTimesByDate({});
      } else {
        toast.error("Error: " + data?.error);
      }
      setIsLoading(false);
    } catch {
      toast.error("Submission failed");
      setIsLoading(false);
    } finally {
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
            disabled={{ before: startOfToday() }}
            modifiers={{
              available: therapistAvailability.map((d) => new Date(d.date)),
            }}
            modifiersClassNames={{ available: "available-date" }}
            selected={selectedDates}
            onSelect={(dates) => setSelectedDates(dates || [])}
          />
        </div>

        <div className="rightSlots">
          {selectedDates?.length ? (
            selectedDates?.map((date) => {
              const dateStr = format(date, "yyyy-MM-dd");
              const availableTimes = availabilityMap.get(dateStr) || [];

              return (
                <div key={dateStr} className="datetimeSelector">
                  <h3>{format(date, "dd MMM yyyy")}</h3>
                  <div className="timeSlotContainer">
                    {TIME_SLOTS.map((time) => {
                      const isExisting = availableTimes.includes(time);
                      const isSelected =
                        selectedTimesByDate[dateStr]?.includes(time);

                      return (
                        <button
                          key={time}
                          onClick={() => {
                            if (!isExisting) toggleTimeSlot(dateStr, time);
                          }}
                          className={`timeSlotBtn ${
                            isExisting ? "existing-slot" : ""
                          } ${isSelected ? "selected" : ""}`}
                          style={{
                            cursor: !isExisting ? "pointer" : "not-allowed",
                            border: isSelected
                              ? "2px solid "
                              : isExisting
                              ? "1px solid red"
                              : "1px solid #ccc",
                            backgroundColor: isSelected
                              ? "#336780"
                              : isExisting
                              ? "red"
                              : "#fff",
                            color: isExisting ? "#fff" : "#000",
                            pointerEvents: isExisting ? "none" : "auto",
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="pleaseSelectText">
              Please Select The dates you want to schedule
            </p>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={handleSubmit} className="saveBtn" disabled={isLoading}>
          {isLoading ? (
            <TailSpin height={20} width={20} color="#fff" />
          ) : (
            "Save Availability"
          )}
        </button>
      </div>
    </>
  );
};

export default DoctorAvailabilitySelector;
