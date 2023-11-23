import React from "react";
import { useNavigate } from "react-router-dom";

export const buttonStyle = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#47A992",
  color: "white",
  padding: "10 22",
  borderRadius: "20px 0px 0px 0px",
  margin: 2,
  height: 50,
  width: 240,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out ",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
};

const buttonStyle1 = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#32806d",
  padding: "10 22",
  borderRadius: "0px 0px 20px 0px",
  margin: 18,
  height: 50,
  width: 240,
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
};

const JobSeekerBtn = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-default hover:scale-110 "
      style={buttonStyle}
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
};

const EmployeeBtn = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-default hover:scale-110 "
      id="btn-1"
      style={buttonStyle1}
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
};

const buttonContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const buttonRow = () => (
  <div style={buttonContainerStyle}>
    <JobSeekerBtn label="I'm a Job Seeker" to="/seeker/login" />
    <EmployeeBtn label="I'm an Employee" to="/employee/login" />
  </div>
);

export default buttonRow;
