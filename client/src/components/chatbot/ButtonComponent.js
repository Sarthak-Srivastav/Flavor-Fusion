// ButtonComponent.js
import React from "react";
import "../../styles/chatbot.css";
import chatbot from "../../image/chatbot.gif";

const ButtonComponent = ({ onClick }) => {
  return (
    <button
      className="circular-button"
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "100px",
        right: "100px",
        zIndex: "1000",
      }}
    >
      <img src={chatbot} alt="Icon" className="icon" />
    </button>
  );
};

export default ButtonComponent;
