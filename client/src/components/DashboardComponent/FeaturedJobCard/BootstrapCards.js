import React from "react";
import "./BootstrapCards.css";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CompanyLogoImg from "../../assets/company-logo.jpg";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdWork } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
const BootstrapCards = ({ user, ImgSrc }) => {
  // Convert single user object to an array if necessary
  const users = Array.isArray(user) ? user : [user];
  const navigate = useNavigate();

  const routeChange = (id) => {
    navigate("/description", { state: { jobId: id } });
  };
  return (
    <div className="card-container">
      <div className="card-row">
        {users.map((job, index) => (
          <div className={`card card-without-hover jobs-details-card`}>
          <div className="card-body">
            <div className="card-top-content">
              <div className="row">
                <div className="col-4 image-col">
                  <img
                    src={CompanyLogoImg}
                    alt="Logo not found"
                    className="company-logo"
                  />
                </div>
                <div className="col descr-col">
                  <div className="row">
                    <p className="job-descr">{job.jobTitle}</p>
                  </div>
                  <div className="row">
                    <p className="card-text">
                      <BsFillBuildingsFill fontSize={20} className="icon" />{" "}
                      {job.companyName}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text">
                      <GoLocation fontSize={20} className="icon" />{" "}
                      {job.jobLocation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="value-div-outer">
                <div className="value-div-inner">
                  <span className="border border-black rounded-pill pill">
                    {job.jobType}
                  </span>
                </div>
                <div className="value-div-inner">
                  <span className="border border-black rounded-pill pill">
                    Remote
                  </span>
                </div>
                <div className="value-div-inner">
                  <span className="border border-black rounded-pill pill">
                    <MdWork fontSize={15} className="icon" /> 2+yrs
                  </span>
                </div>
                <div className="value-div-inner">
                  <span className="border border-black rounded-pill pill">
                    <MdAttachMoney fontSize={20} className="icon" />
                    CTC {job.expectedPackage}
                  </span>
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="lower-card-content">
              <button
                type="button"
                className="ctc-button btn btn-lg btn-dark rounded-pill float-left"
              >
                {job.isExpired ? "Expired" : "Active"}
              </button>
              <button
                type="button"
                className="details-button btn btn-lg btn-dark rounded-pill float-right"
                onClick={() => routeChange(job._id)}
              >
                Details
              </button>
            </div>
          </div>
        </div>
          
        ))}
        {/* <div className="card-column" key={index}>
            <div className="card h-100">
          
              <div className="card-body card-content">
                <h3 className="card-title">{user.companyName}</h3>
                <h4>{user.jobLocation}</h4>
                <p>
                  the largest pool of career opportunities that match your skill
                  set. link up with outstanding people to create a better
                  future.
                </p>
                <p>
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <AiFillDollarCircle className="dollar-icon" />
                    <span style={{ marginLeft: "0.5rem" }}>
                      {user.expectedPackage}
                    </span>
                    <span style={{ marginLeft: "0.2rem" }}>per annum</span>
                  </span>
                </p>
              </div>
              <button type="submit" className="btn card-button">
                View details
              </button>
            </div>
          </div>*/}
      </div> 
    </div>
  );
};

export default BootstrapCards;
