import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";

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

const SubmissionsDetail = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`/api/v1/recipe/${id}`);
        setSubmission(res.data.submission);
      } catch (err) {
        setError("Failed to load submission");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id]);

  return (
    <Layout title="Submission Details">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center" style={{ fontWeight: 700, fontSize: "2.2rem", marginBottom: 30 }}>
              Submission Details
            </h1>
            <div style={{ maxWidth: 600, margin: "2.5rem auto", background: "#fff", borderRadius: 24, boxShadow: "0 4px 32px rgba(0,0,0,0.10)", padding: "2.5rem 1.5rem", border: "2px solid #eee" }}>
              {loading ? (
                <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>Loading...</div>
              ) : error ? (
                <div style={{ textAlign: "center", color: "#ff7e7e", fontSize: 20 }}>{error}</div>
              ) : !submission ? (
                <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>Submission not found.</div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginBottom: 18 }}>
                    {submission.photo?.data && submission.photo?.contentType ? (
                      <img
                        src={`data:${submission.photo.contentType};base64,${arrayBufferToBase64(submission.photo.data.data)}`}
                        alt="Recipe"
                        style={{ width: 220, height: 220, borderRadius: 24, objectFit: "cover", border: "1px solid #eee" }}
                      />
                    ) : (
                      <div style={{ width: 220, height: 220, borderRadius: 24, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontWeight: 700, fontSize: 32 }}>No Image</div>
                    )}
                    <div style={{ fontWeight: 700, color: "#b3004b", fontSize: 26 }}>{submission.name}</div>
                    <div style={{ color: "#888", fontSize: 18 }}>{submission.userName} ({submission.userEmail})</div>
                    <div style={{ color: "#444", fontSize: 18, marginTop: 4 }}>
                      <b>Type:</b> <span style={{
                        color: submission.type.toLowerCase().includes("veg") ? "#1db954" : "#e74c3c",
                        fontWeight: 700
                      }}>
                        <span style={{
                          display: "inline-block",
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: submission.type.toLowerCase().includes("veg") ? "#1db954" : "#e74c3c",
                          marginRight: 6,
                          verticalAlign: "middle"
                        }}></span>
                        {submission.type}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: "#222", fontSize: 17, marginBottom: 10 }}><b>Origin:</b> {submission.origin}</div>
                  <div style={{ fontWeight: 700, color: "#7d1fff", fontSize: 19, marginBottom: 10 }}>
                    <span style={{ color: "#7d1fff" }}>Calories :</span> {submission.calories}
                  </div>
                  <div style={{ color: "#222", fontSize: 17, marginBottom: 10, whiteSpace: "pre-line" }}><b>Recipe:</b> {submission.recipe}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmissionsDetail; 