"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [customCategory, setCustomCategory] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {

    const script = document.createElement("script");

    script.src =
      "https://upload-widget.cloudinary.com/global/all.js";

    script.async = true;

    document.body.appendChild(script);

  }, []);

  async function handleSubmit(e) {

    e.preventDefault();

    if (!uploadedFile) {
      alert("Please upload a file first");
      return;
    }

    setLoading(true);

    const form = e.target;

    try {

      const finalCategory =
        form.category.value === "Custom"
          ? customCategory
          : form.category.value;

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

        fileUrl: uploadedFile.secure_url,

        filePublicId: uploadedFile.public_id

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

        setUploadedFile(null);

      } else {

        alert(result.error || "Submission failed");

      }

    } catch(error) {

      console.error(error);

      alert(error.message);

    }

    setLoading(false);

  }

  function openUploadWidget() {

    const widget =
      window.cloudinary.createUploadWidget(

        {
          cloudName: "muxrjcvw",

          uploadPreset: "wto_uploads",

          sources: ["local"],

          multiple: false,

          resourceType: "auto",

          maxFileSize: 100000000
        },

        (error, result) => {

          if (
            !error &&
            result &&
            result.event === "success"
          ) {

            setUploadedFile(result.info);

          }

        }

      );

    widget.open();

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

      {success ? (

        <div
          style={{
            padding: "30px",
            background: "#e7ffe7",
            marginTop: "30px",
            borderRadius: "10px",
            textAlign: "center"
          }}
        >

          <h2>
            Submission Successful 🎉
          </h2>

          <p
            style={{
              fontSize: "18px",
              marginTop: "20px"
            }}
          >
            Your Submission ID
          </p>

          <h1>
            {success}
          </h1>

          <p
            style={{
              marginTop: "25px",
              lineHeight: "28px"
            }}
          >
            Our team will verify your submission
            and payment manually.
            <br /><br />
            Results for this batch will be announced
            on Tuesday, 7 July 2026 on our official
            social media pages.
          </p>

          <a
            href="https://wa.me/917689988389"
            target="_blank"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "14px 24px",
              background: "#25D366",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            Contact on WhatsApp
          </a>

        </div>

      ) : (

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
            <option value="">
              Select Talent Category
            </option>

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
            onChange={(e) =>
              setCustomCategory(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            type="button"
            onClick={openUploadWidget}
            style={buttonStyle}
          >
            {uploadedFile
              ? "File Uploaded Successfully"
              : "Upload Talent File (Under 100MB)"}
          </button>

          <a
            href="https://wa.me/917689988389"
            target="_blank"
            style={{
              ...buttonStyle,
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              background: "#25D366"
            }}
          >
            Send Large Files on WhatsApp
          </a>

          <p
            style={{
              marginTop: "10px",
              color: "gray",
              fontSize: "14px"
            }}
          >
            Upload JPG, PNG, PDF, MP3 or MP4 under 100MB.
            <br />
            For larger files, use WhatsApp submission.
          </p>

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
            {loading
              ? "Submitting..."
              : "Submit"}
          </button>

        </form>

      )}

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
