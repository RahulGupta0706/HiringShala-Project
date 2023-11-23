import React, { useState } from "react";
import "./Dashboard.css";

const CompanyOrCollegeNameInput = ({ onSubmit }) => {
  const [inputType, setInputType] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(inputType, name);
  };

  return (
    <div className="companyNameInput">
      <h2>Select your Profession:</h2>
      <div className="radioGroup">
        <label className="radioLabel">
          <input
            type="radio"
            value="college"
            checked={inputType === "college"}
            onChange={() => setInputType("college")}
          />
          Student
        </label>
        <label className="radioLabel">
          <input
            type="radio"
            value="company"
            checked={inputType === "company"}
            onChange={() => setInputType("company")}
          />
          Working Employee
        </label>
      </div>

      {inputType === "college" ? (
        <>
          <h2>Enter Your College Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="College Name"
            className="textInput"
          />
        </>
      ) : inputType === "company" ? (
        <>
          <h2>Enter Your Company Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Company Name"
            className="textInput"
          />
        </>
      ) : null}

      <button onClick={handleSubmit} className="submitButton">
        Submit
      </button>
    </div>
  );
};

export default CompanyOrCollegeNameInput;
