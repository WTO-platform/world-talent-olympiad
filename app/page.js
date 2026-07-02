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

  async function openUploadWidget() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept =
      "video/*,image/*,.pdf,.mp3,.wav";

    input.onchange = async (event) => {

      let file = event.target.files[0];

      if (!file) return;

      try {

        // VIDEO COMPRESSION

        if (file.type.startsWith("video/")) {

          alert(
            "Compressing video before upload. Please wait..."
          );

          const {
            FFmpeg
          } = await import("@ffmpeg/ffmpeg");

          const {
            fetchFile
          } = await import("@ffmpeg/util");

          const ffmpeg = new FFmpeg();

          await ffmpeg.load();

          await ffmpeg.writeFile(
            file.name,
            await fetchFile(file)
          );

          await ffmpeg.exec([
            "-i",
            file.name,

            "-vcodec",
            "libx264",

            "-crf",
            "32",

            "-preset",
            "fast",

            "-acodec",
            "aac",

            "compressed.mp4"
          ]);

          const data =
            await ffmpeg.readFile(
              "compressed.mp4"
            );

          file = new File(
            [data],
            "compressed.mp4",
            {
              type: "video/mp4"
            }
          );

          alert(
            "Compression completed. Upload starting..."
          );

        }

        // CLOUDINARY UPLOAD

        const cloudinaryData =
          new FormData();

        cloudinaryData.append(
          "file",
          file
        );

        cloudinaryData.append(
          "upload_preset",
          "wto_uploads"
        );

        const cloudinaryResponse =
          await fetch(
            "https://api.cloudinary.com/v1_1/muxrjcvw/auto/upload",
            {
              method: "POST",
              body: cloudinaryData
            }
          );

        const cloudinaryResult =
          await cloudinaryResponse.json();

        if (
          cloudinaryResult.secure_url
        ) {

          setUploadedFile(
            cloudinaryResult
          );

          alert(
            "File uploaded successfully"
          );

        } else {

          alert(
            "Upload failed"
          );

        }

      } catch(error) {

        console.error(error);

        alert(
          "Upload failed"
        );

      }

    };

    input.click();

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
            : "Upload Talent File"}
        </button>

        <p
          style={{
            marginTop: "10px",
            color: "gray",
            fontSize: "14px"
          }}
        >
          Upload MP4, MP3, PDF,
          JPG, PNG or HEIC.
          Large videos are compressed
          automatically before upload.
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
