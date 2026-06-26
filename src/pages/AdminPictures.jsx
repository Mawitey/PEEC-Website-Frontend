import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPictures() {
  const navigate = useNavigate();

  const [pictures, setPictures] = useState({
    homeHero: localStorage.getItem("homeHeroImage") || "",
    aboutImage: localStorage.getItem("aboutImage") || "",
    pastorImage: localStorage.getItem("pastorImage") || "",
    eventImage: localStorage.getItem("eventImage") || "",
    growFaith: localStorage.getItem("growFaithImage") || "",
    community: localStorage.getItem("communityImage") || "",
    impact: localStorage.getItem("impactImage") || "",
  });

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem(key, reader.result);
      setPictures((prev) => ({
        ...prev,
        [key]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <h1>Manage Pictures</h1>
        <button onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Home Page Hero Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "homeHeroImage")}
          />
          {pictures.homeHero && (
            <img src={pictures.homeHero} alt="Home Hero" className="admin-preview" />
          )}
        </div>

        <div className="admin-card">
          <h2>About Page Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "aboutImage")}
          />
          {pictures.aboutImage && (
            <img src={pictures.aboutImage} alt="About" className="admin-preview" />
          )}
        </div>

        <div className="admin-card">
          <h2>Pastor Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "pastorImage")}
          />
          {pictures.pastorImage && (
            <img src={pictures.pastorImage} alt="Pastor" className="admin-preview" />
          )}
        </div>

        <div className="admin-card">
          <h2>Event Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "eventImage")}
          />
          {pictures.eventImage && (
            <img src={pictures.eventImage} alt="Event" className="admin-preview" />
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminPictures;