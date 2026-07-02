async function handleSubmit(e) {

  e.preventDefault();

  setLoading(true);

  const form = e.target;

  const file = form.file.files[0];

  if (!file) {
    alert("Please upload a file");
    setLoading(false);
    return;
  }

  try {

    // STEP 1 — Upload to Cloudinary

    const cloudinaryData = new FormData();

    cloudinaryData.append("file", file);

    cloudinaryData.append(
      "upload_preset",
      "wto_uploads"
    );

    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/muxrjcvw/auto/upload",
      {
        method: "POST",
        body: cloudinaryData
      }
    );

    const cloudinaryResult =
      await cloudinaryResponse.json();

    // STEP 2 — Final Category

    const finalCategory =
      form.category.value === "Custom"
        ? customCategory
        : form.category.value;

    // STEP 3 — Send ONLY metadata to Apps Script

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
      "https://script.google.com/macros/s/AKfycbylhg5ubj_1LnUs-XZ3dKDPdV64nhgCoJFfanL6khpvb38LT-3UjtNAbHGAy825bQ2YlQ/exec",
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
