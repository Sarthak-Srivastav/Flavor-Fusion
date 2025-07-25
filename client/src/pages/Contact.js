// import React from "react";
// import Layout from "../components/layout/layout";

// const Contact = () => {
//   return (
//     <Layout>
//       <h1>Contact Page</h1>
//     </Layout>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import Layout from "../components/layout/layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/Auth";

const Contact = () => {
  const [photo, setPhoto] = useState(null);
  const [origin, setOrigin] = useState("");
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [auth] = useAuth();
  const userName = auth?.user?.name || "";
  const userEmail = auth?.user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (photo) formData.append("photo", photo);
      formData.append("origin", origin);
      formData.append("name", name);
      formData.append("recipe", recipe);
      formData.append("calories", calories);
      formData.append("type", type);
      formData.append("userName", userName);
      formData.append("userEmail", userEmail);
      const res = await axios.post("/api/v1/recipe/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setPhoto(null);
        setOrigin("");
        setName("");
        setRecipe("");
        setCalories("");
        setType("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title={"Create Recipe"}>
      <div style={{ maxWidth: 900, margin: "2.5rem auto", background: "#fff", borderRadius: 20, boxShadow: "0 4px 32px rgba(0,0,0,0.07)", padding: "2.5rem 1.5rem" }}>
        <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: "2.5rem", marginBottom: 30 }}>
          CREATE RECIPE <span role="img" aria-label="bowl">🥗</span>
        </h1>
        {auth?.user ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <input
            type="text"
            value={userName}
            readOnly
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none", color: "#888" }}
            placeholder="User Name"
          />
          <input
            type="email"
            value={userEmail}
            readOnly
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none", color: "#888" }}
            placeholder="User Email"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setPhoto(e.target.files[0])}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none" }}
          />
          <input
            type="text"
            placeholder="Write Country Of Origin"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none" }}
            required
          />
          <input
            type="text"
            placeholder="Write Recipe Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none" }}
            required
          />
          <textarea
            placeholder="Write The Recipe"
            value={recipe}
            onChange={e => setRecipe(e.target.value)}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none", minHeight: 80 }}
            required
          />
          <input
            type="number"
            placeholder="Write Total Calories"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none" }}
            required
          />
          <input
            type="text"
            placeholder="Write Type"
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ borderRadius: 30, background: "#e5e5e5", padding: 16, fontSize: 16, border: "none" }}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            style={{ background: "#ff7e7e", color: "#fff", border: "none", borderRadius: 30, padding: "14px 36px", fontWeight: 700, fontSize: 18, marginTop: 10, alignSelf: "flex-start", boxShadow: "0 2px 8px rgba(255,126,126,0.08)", cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Submitting..." : "CREATE RECIPE"}
          </button>
        </form>
        ) : (
          <div style={{ textAlign: "center", color: "#ff7e7e", fontWeight: 600, fontSize: 20, marginTop: 40 }}>
            Please log in to submit a recipe.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
