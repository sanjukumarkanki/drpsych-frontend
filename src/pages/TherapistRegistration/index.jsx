import React, { useState } from "react";
import styles from "./index.module.css";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const TherapistRegistration = () => {
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({
    rci_certificate: null,
    aadhaar: null,
    degree: null,
    resume: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append text inputs
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append file inputs
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3005/api/therapists/upload-documents",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        setErrorMessage("Registration Got Failed");
        // Error
        toast.error("Failed to create therapist. Email already exists.");
        return;
      }

      const result = await res.json();
      setIsLoading(false);
      // Success
      toast.success("Therapist created successfully!");
    } catch (err) {
      setIsLoading(false);
      // Error
      toast.error(err);
    } finally {
      setIsLoading(false);
      setErrorMessage("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
        encType="multipart/form-data"
      >
        <h2>Therapist Onboarding</h2>
        <div className={styles.formContainerWrapper}>
          <div className={styles.inputGroup}>
            <label>Name*</label>
            <input name="name" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Email*</label>
            <input name="email" type="email" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone*</label>
            <input name="phone" type="tel" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Degree*</label>
            <input name="degree" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>University Name*</label>
            <input name="universityName" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Graduation Year*</label>
            <input
              name="graduationYear"
              type="number"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Specializations*</label>
            <input name="specializations" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Certified Training*</label>
            <input name="certifiedTraining" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Experience (Years)*</label>
            <input
              name="experience"
              type="number"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Worked on online therapy platforms before?*</label>
            <select
              name="workedOnlineTherapiesBefore"
              required
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>RCI Registration Number</label>
            <input name="rciRegistrationNumber" onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Hours per week*</label>
            <input name="hoursPerWeek" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Time Slots*</label>
            <input name="timeSlots" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Languages*</label>
            <input name="languages" required onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Comfortable with pay per session?*</label>
            <select
              name="comfortableWithPayPerSession"
              required
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Upload Resume*</label>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Upload Degree Certificate*</label>
            <input
              name="degree"
              type="file"
              accept=".pdf,.jpg,.png"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Upload Aadhaar*</label>
            <input
              name="aadhaar"
              type="file"
              accept=".pdf,.jpg,.png"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Upload RCI Certificate</label>
            <input
              name="rci_certificate"
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? (
            <TailSpin width={20} height={20} color="#fff" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default TherapistRegistration;
