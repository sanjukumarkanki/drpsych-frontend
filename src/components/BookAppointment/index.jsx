import React, { useState, useEffect, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { webUrl } from "../../common";
import AppContext from "../../context/AppContext";
import styles from "./index.module.css";
import popupStyles from "./popupContainer.module.css";
import "./index.css";

const BookAppointment = ({
  asPopup = false,
  title = "Book an Appointment",
  price = 0,
  type = "general",
  onComplete,
}) => {
  const { getOptions } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`${webUrl}/api/therapist-availability/all`);
        const data = await res.json();
        setAvailability(data);
        setAvailableDates(data.map((d) => new Date(d.date)));
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString().slice(0, 10);
    const match = availability.find((a) => a.date === isoDate);
    setSlots(match?.slots || []);
    setSelectedSlot("");
  };

  // const handleBook = async () => {
  //   const res = await fetch("/api/book", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       userId: "USER_ID_HERE",
  //       date: selectedDate.toISOString().slice(0, 10),
  //       time: selectedSlot,
  //       reason,
  //       type,
  //     }),
  //   });
  //   const data = await res.json();
  //   setAppointmentId(data.appointmentId);
  //   handlePayment(data.appointmentId);
  // };

  const handleBook = async () => {
    try {
      // 1. Create Razorpay Order from backend
      const orderRes = await fetch(
        "http://localhost:3005/api/payments",
        getOptions("POST", {
          amount: 1000, // Amount in paisa (₹10)
          currency: "INR",
        })
      );

      const { id } = await orderRes.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_7aN1PQTzOMro7K", // Your Razorpay key
        amount: 1000,
        currency: "INR",
        name: "Prescripto",
        description: "Session Booking Payment",
        order_id: id,
        config: {
          display: {
            blocks: {
              banks: {
                name: "Most Used Methods",
                instruments: [
                  {
                    method: "wallet",
                    wallets: ["freecharge"],
                  },
                  {
                    method: "upi",
                  },
                ],
              },
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },

        handler: async function (response) {
          console.log("Razorpay Handler Response:", response);
          // 3. Verify payment with backend
          const verifyRes = await fetch(
            "http://localhost:3005/api/payments/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNiZDZmMjAxNDZjMmU5ODJkN2M4MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUyNDM2NjMyLCJleHAiOjE3NTMwNDE0MzJ9.LahxDjUuCSX5YIXP6dMG-XR_ghJfOY5rhncysKcEu_I",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: 13,
                sessionDetails: {
                  date: selectedDate?.toISOString().slice(0, 10),
                  time: selectedSlot,
                  type,
                  reason,
                },
              }),
            }
          );

          const result = await verifyRes.json();
          console.log(result, "result");
          if (result.success) {
            alert("✅ Payment successful and session created!");
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: "Your Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Something went wrong during payment.");
    }
  };

  return (
    <div
      className={asPopup ? popupStyles.popupContainer : styles.sectionContainer}
    >
      <div className={popupStyles.popupCalendarContainer}>
        <div className={popupStyles.popupCalendarDescriptionContainer}>
          <h2 className={popupStyles.title}>{title}</h2>
          <p className={popupStyles.description}>
            Secure your session by selecting a time and completing the payment.
            You'll receive a Google Meet link for your therapy appointment.
          </p>
        </div>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          modifiersClassNames={{
            selected: "my-selected",
            available: "my-available",
          }}
          disabled={(date) =>
            !availableDates.some(
              (d) => d.toDateString() === date.toDateString()
            )
          }
        />
        {slots.length > 0 && (
          <div className={popupStyles.popupSlotsContainer}>
            <h4 style={{ color: "#336780" }} className={popupStyles.title}>
              Select Available Time Slot
            </h4>
            <div className={popupStyles.popupSlots}>
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`${popupStyles.slotButton} ${
                    selectedSlot === slot.time ? popupStyles.selectedSlot : ""
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {selectedSlot && (
              <>
                <select
                  name="language"
                  className={`${styles.customSelect} ${styles.nameInput}`}
                  required
                >
                  <option value="">Preferred Language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="telugu">Telugu</option>
                  <option value="tamil">Tamil</option>
                  <option value="kannada">Kannada</option>
                </select>
                <div style={{ flexGrow: 1 }}>
                  <textarea
                    placeholder="Why are you booking this slot?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className={styles.textareaInput}
                  />
                </div>
                <button
                  onClick={handleBook}
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#336780",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Proceed to Pay
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
