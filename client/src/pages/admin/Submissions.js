import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { useNavigate } from "react-router-dom";

function arrayBufferToBase64(buffer) {
  if (!buffer || !Array.isArray(buffer)) return "";
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("/api/v1/recipe/all");
        setSubmissions(res.data.submissions || []);
      } catch (err) {
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <Layout title="Recipe Submissions">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center" style={{ fontWeight: 700, fontSize: "2.2rem", marginBottom: 30 }}>
              Submitted Recipes
            </h1>
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>Loading...</div>
            ) : error ? (
              <div style={{ textAlign: "center", color: "#ff7e7e", fontSize: 20 }}>{error}</div>
            ) : submissions.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>No submissions found.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
                {submissions.map((s, idx) => (
                  <div
                    key={s._id || idx}
                    onClick={() => navigate(`/dashboard/admin/submissions/${s._id}`)}
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
                      border: "2px solid #eee",
                      overflow: "hidden",
                      maxWidth: 370,
                      margin: "0 auto",
                      cursor: "pointer",
                      transition: "box-shadow 0.18s, border 0.18s, background 0.18s, transform 0.15s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 0,
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {s.photo?.data && s.photo?.contentType ? (
                      <img
                        src={`data:${s.photo.contentType};base64,${arrayBufferToBase64(s.photo.data.data)}`}
                        alt="Recipe"
                        style={{ width: "100%", height: 220, objectFit: "cover", borderTopLeftRadius: 24, borderTopRightRadius: 24, borderBottom: "1px solid #eee" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: 220, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontWeight: 700, fontSize: 28 }}>No Image</div>
                    )}
                    <div style={{ padding: "1.2rem 1.2rem 1.5rem 1.2rem", width: "100%" }}>
                      <div style={{ fontWeight: 600, color: "#222", fontSize: 18, marginBottom: 6 }}>
                        <span style={{ color: "#222" }}>Origin :</span> {s.origin}
                      </div>
                      <div style={{ fontWeight: 700, color: "#b3004b", fontSize: 20, marginBottom: 6 }}>
                        <span style={{ color: "#222" }}>Name :</span> <span style={{ color: "#b3004b" }}>{s.name}</span>
                      </div>
                      <div style={{ fontWeight: 600, color: "#222", fontSize: 17, marginBottom: 6 }}>
                        <span style={{ color: "#222" }}>Type :</span>{" "}
                        <span style={{
                          color: s.type.toLowerCase().includes("veg") ? "#1db954" : "#e74c3c",
                          fontWeight: 700
                        }}>
                          <span style={{
                            display: "inline-block",
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            background: s.type.toLowerCase().includes("veg") ? "#1db954" : "#e74c3c",
                            marginRight: 6,
                            verticalAlign: "middle"
                          }}></span>
                          {s.type}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, color: "#7d1fff", fontSize: 19 }}>
                        <span style={{ color: "#7d1fff" }}>Calories :</span> {s.calories}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Submissions; 