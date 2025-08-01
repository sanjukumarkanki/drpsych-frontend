import React, { useState, useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { webUrl } from "../../common";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import styles from "./index.module.css";
import popupStyles from "./popupContainer.module.css";
import "./index.css";
import { format, isDate } from "date-fns";

const BookAppointment = ({
  asPopup = false,
  title = "Book an Appointment",
  price = 0,
  type = "general",
  onComplete,
}) => {
  const { getOptions, userData } = useContext(AppContext);
  const { user } = userData;
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentId, setAppointmentId] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();

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
    const formatDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formatDate);
    const match = availability.find((a) => a.date === formatDate);
    setSlots(match?.slots || []);
    setSelectedSlot("");
  };

  const handleBook = async (e) => {
    try {
      e.preventDefault();
      // 1. Create R
      // azorpay Order from backend
      const orderRes = await fetch(
        `${webUrl}/api/payments`,
        getOptions("POST", {
          amount: price, // Amount in paisa (₹10)
          currency: "INR",
        })
      );

      const { id } = await orderRes.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_7aN1PQTzOMro7K", // Your Razorpay key
        amount: price,
        currency: "INR",
        name: "DrPsych",
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
          console.log(response, "response");
          // 3. Verify payment with backend
          const verifyRes = await fetch(
            `${webUrl}/api/payments/verify`,
            getOptions("POST", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              sessionDetails: {
                date: selectedDate,
                time: selectedSlot,
                type,
                reason,
                language: selectedLanguage,
              },
            })
          );

          const result = await verifyRes.json();
          if (result.success) {
            toast.success(" Payment successful and session created!");
            onComplete();
          } else {
            onComplete();
            toast.error(" Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone,
        },
        theme: {
          color: "#336780",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Payment error:", err);
    }
  };

  return (
    <div
      className={asPopup ? popupStyles.popupContainer : styles.sectionContainer}
    >
      <button type="button" className="cancelButton" onClick={onComplete}>
        <RxCross2 />
      </button>

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
          <form
            onSubmit={handleBook}
            className={popupStyles.popupSlotsContainer}
          >
            <h4 style={{ color: "#336780" }} className={popupStyles.title}>
              Select Available Time Slot
            </h4>
            <div className={popupStyles.popupSlots}>
              {slots.map((slot) => (
                <button
                  type="button"
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
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`customSelect ${styles.nameInput}`}
                  required
                >
                  <option selected disabled value={selectedLanguage}>
                    Preferred Language
                  </option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="telugu">Telugu</option>
                  <option value="tamil">Tamil</option>
                  <option value="kannada">Kannada</option>
                </select>
                <div style={{ flexGrow: 1 }}>
                  <textarea
                    required
                    title="Please write the reason to take therapy"
                    placeholder="Why are you booking this slot?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className={styles.textareaInput}
                  />
                </div>
                <button
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
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
