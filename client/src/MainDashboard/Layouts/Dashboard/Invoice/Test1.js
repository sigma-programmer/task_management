import React, { useState } from "react";
import axios from "axios";

const Test1 = () => {
  const [logo, setLogo] = useState(null); // For storing the uploaded logo
  const [logoPreview, setLogoPreview] = useState(null); // For displaying the logo preview

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(file);
        setLogoPreview(e.target.result); // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!logo) {
      alert("Please upload a logo before saving!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", logo);

      // Replace the URL with your actual backend endpoint
      const response = await axios.post("http://localhost:8000/api/save-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Logo saved successfully!");
    } catch (error) {
      console.error("Error saving logo:", error);
      alert("Failed to save logo.");
    }
  };

  return (
    <div className="company-logo">
      {logoPreview ? (
        <img src={logoPreview} alt="Company Logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ) : (
        <h1 className="HeadingOfInvoice">
          A <span className="SpanOfInvoice">Invoice</span>
        </h1>
      )}
      <div>
        <label htmlFor="logoUpload" style={{ cursor: "pointer", color: "blue" }}>
          + Upload Logo
        </label>
        <input
          id="logoUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleLogoUpload}
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary mt-2">
        Save
      </button>
    </div>
  );
};

export default Test1;
