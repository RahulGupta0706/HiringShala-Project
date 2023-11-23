import React, { useState } from "react";
import "./Dashboard.css";

const CompanyNameInput = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = () => {
    onSubmit(companyName);
  };

  return (
    <div className="companyNameInput">
      <h2>Enter Your Company Name</h2>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CompanyNameInput;
