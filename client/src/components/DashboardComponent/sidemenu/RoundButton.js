import React from "react";
import "./Button.css";

const RoundButton = ({ text, onClick, className }) => {
  const buttonClass = `round-button ${className}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundButton;
