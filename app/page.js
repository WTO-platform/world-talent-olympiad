"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {

    const script = document.createElement("script");

    script.src =
      "https://upload-widget.cloudinary.com/global/all.js";

    script.async = true;

    document.body.appendChild(script);

  }, []);

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    try {

      // Open Cloudinary Upload Widget

      const cloudinaryResult = await new Promise((resolve, reject) => {

        const widget = window.cloudinary.createUploadWidget(

          {
            cloudName: "muxrjcvw",

            uploadPreset: "wto_uploads",

            sources: ["local"],

            multiple: false,

            resourceType: "auto",

            maxFileSize: 300000000
          },

          (error, result) => {

            if (error) {
              reject(error);
              return;
            }

            if (result.event === "success") {
              resolve(result.info);
            }

          }

        );

        widget.open();

      });

      // Final category

      const finalCategory =
        form.category.value === "Custom"
          ? customCategory
          : form.category.value;

      // Send to Apps Script

      const payload = {

        fullName: form.fullName.value,

        age: form.age.value,

        country: form.country.value,

        whatsapp: form.whatsapp.value,

        email: form.email.value,

        category: finalCategory,

        paymentChoice: form.payment.value,

        batchId: "WTO-2026-W27",

        resultDate: "7 July 2026",

        fileUrl: cloudinaryResult.secure_url,

        filePublicId: cloudinaryResult.public_id

      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwqtXzW9vez7dw2vaIUj8ok_LMr-3Vu92PVrFowBO9ZrZ915QuHciiBDkPPOwTugtD3kA/exec",
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      if (result.success) {

        setSuccess(result.submissionId);

        form.reset();

        setCustomCategory("");

      } else {

        alert(result.error || "Submission failed");

      }

    } catch(error) {

      console.error(error);

      alert(error.message);

    }

    setLoading(false);

  }

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <h1>World Talent Olympiad 2026</h1>

      <p>
        Submit your talent and get global recognition.
      </p>

      {success && (
        <div
          style={{
            padding: "20px",
            background: "#e7ffe7",
            marginBottom: "20px"
          }}
        >
          Submission Successful!
          <br /><br />
          Submission ID:
          <br />
          <strong>{success}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <input
          name="fullName"
          placeholder="Full Name"
          required
          style={inputStyle}
        />

        <input
          name="age"
          placeholder="Age"
          required
          style={inputStyle}
        />

        <input
          name="country"
          placeholder="Country"
          required
          style={inputStyle}
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp Number"
          required
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email (Optional)"
          style={inputStyle}
        />

        <select
          name="category"
          required
          style={inputStyle}
          onChange={(e) => {
            if (e.target.value !== "Custom") {
              setCustomCategory("");
            }
          }}
        >
          <option value="">Select Talent Category</option>
          <option>Singing</option>
          <option>Dancing</option>
          <option>Painting</option>
          <option>Acting</option>
          <option>Photography</option>
          <option>Magic</option>
          <option>Custom</option>
        </select>

        <input
          placeholder="Custom Category (Optional)"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: "20px" }}>

          <label>
            <input
              type="radio"
              name="payment"
              value="Paid"
              required
            />
            {" "}I Have Paid
          </label>

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="Pending"
            />
            {" "}I Will Pay Later
          </label>

        </div>

        <button
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>

    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer"
};
