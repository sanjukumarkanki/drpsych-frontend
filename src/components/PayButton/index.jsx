import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
// import axios from "axios";

const PayButton = ({ userId, sessionDetails }) => {
  const { getOptions } = useContext(AppContext);
  const handlePayment = async () => {
    try {
      // 1. Create Razorpay Order from backend
      const orderRes = await fetch(
        "http://localhost:3005/api/payments",
        getOptions("POST", {
          amount: 1000, // Amount in paisa (₹10)
          currency: "INR",
        })
      );

      const { orderId } = await orderRes.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_7aN1PQTzOMro7K", // Your Razorpay key
        amount: 1000,
        currency: "INR",
        name: "Prescripto",
        description: "Session Booking Payment",
        order_id: orderId,
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
          // 3. Verify payment with backend
          const verifyRes = await fetch(
            "http://localhost:3005/api/payment/verify",
            getOptions("POST", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId, // Ensure this is available in your component
              sessionDetails, // Also ensure this is defined
            })
          );

          const result = await verifyRes.json();
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

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayButton;
