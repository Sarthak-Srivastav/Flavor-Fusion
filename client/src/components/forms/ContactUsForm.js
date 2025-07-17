import React from "react";

const ContactUsForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div className="contactForm">
        <form onSubmit={handleSubmit}>
          <h2>Send Message</h2>
          <div className="inputBox">
            <input
              type="text"
              name=""
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <span>Full name</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name=""
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </div>
          <div className="inputBox">
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <span>Type Your Message...</span>
          </div>
          <div className="inputBox">
            <input
              type="submit"
              name=""
              value={submitting ? "Sending..." : "Send"}
              disabled={submitting}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUsForm;
