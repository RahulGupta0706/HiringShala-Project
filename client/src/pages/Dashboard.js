import {React, useState, useEffect} from "react";
import "./Dashboard.css";
import axios from "axios";
import RenderUsersInCards from "../components/DashboardComponent/RefferedJobCard/RenderUsersInCards";
import Sidemenu from "../components/DashboardComponent/sidemenu/Sidemenu";
import FileUploader from "../components/FileUploader/FileUploader";
import TopHeading from "../components/DashboardComponent/TopHeading/TopHeading";
import SeekerJobDetails from "../components/DashboardComponent/SeekerJobDetails";
import EmployeeJobDetails from "../components/DashboardComponent/EmployeeJobDetails";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import RenderJobsInCards from "../components/DashboardComponent/FeaturedJobCard/RenderJobsInCards";
import fetchSeeker from "../components/DashboardComponent/RefferedJobCard/FetchSeeker.js";
import fetchEmployee from "../components/DashboardComponent/RefferedJobCard/FetchEmployee.js";
import fetchJobs from "../components/DashboardComponent/FeaturedJobCard/FetchJob";
import CompanyNameInput from "./CompanyName";
import CompanyOrCollegeNameInput from "./CompanyOrCollegeName";
import { toast } from "react-hot-toast";
import * as Constants from "../constants/String"

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function Dashboard() {
  const [userDataReady, setUserDataReady] = useState(false);
  const [jobDataReady, setJobDataReady] = useState(false);
  const [userData, setUserData] = useState(false);
  const [jobData, setJobData] = useState(false);
  const [isEmployeesCompanyNamePresent, setIsEmployeesCompanyNamePresent] = useState(true);
  const [isSeekersCompanyOrCollegeNamePresent, setIsSeekersCompanyOrCollegeNamePresent] = useState(true);
    const userId = Cookies.get(Constants.userId);
  const isLoggedIn = userId !== undefined && userId !== "";
  const userType = Cookies.get(Constants.userType);
  const isSeeker = userType === "seeker";
  const isEmployee = userType === "employee";
  const location = useLocation();
  const jobId = location.state?.jobId;

  function isNullOrEmpty(value) {
    return value === null 
    || value === undefined || value.trim() === '';
  }

  const handleCompanyNameSubmit = (companyName) => {
    const userData = {employeeCompanyName: companyName}
    axios
        .patch(`${apiUrl}/api/v1/employees/${userId}`, userData)
        .then((res) =>{
          const stringifiedUserDetails = JSON.stringify(res.data.employee);
          sessionStorage.setItem("hiringShala_user", stringifiedUserDetails); 
          toast.success("Company Name Added!");
          setIsEmployeesCompanyNamePresent(true);
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.msg);
          } else if (error.request) {
            toast.error("Network failure or timeout");
          } else {
            toast.error("An unexpected error occurred");
          }
        })
    setIsEmployeesCompanyNamePresent(false);
  };

  const handleCompanyOrCollegeNameSubmit = (inputType, name) => {
    let userData;
    if (inputType === "company")
    {
      userData = {seekerCompanyName : name}
    }
    else
    {
      userData = {collegeName : name}
    }
    axios
        .patch(`${apiUrl}/api/v1/seekers/${userId}`, userData)
        .then((res) =>{
          const stringifiedUserDetails = JSON.stringify(res.data.seeker);
          sessionStorage.setItem("hiringShala_user", stringifiedUserDetails); 
          toast.success("Profession Added!");
          setIsSeekersCompanyOrCollegeNamePresent(true);
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.msg);
          } else if (error.request) {
            toast.error("Network failure or timeout");
          } else {
            toast.error("An unexpected error occurred");
          }
        })
    setIsSeekersCompanyOrCollegeNamePresent(false);
  }

  useEffect(() => {
    if (userType === "employee") {
      fetchEmployee().then((userDataResponse) => {
        setUserData(userDataResponse);
        const isCompanyName = !isNullOrEmpty (userDataResponse.employeeCompanyName)
        setIsEmployeesCompanyNamePresent(isCompanyName);
        setUserDataReady(true);
      }).catch((error) => {
        console.error("Error fetching employee data:", error);
        setUserDataReady(false);
      });
    } else {
      fetchSeeker().then((userDataResponse) => {
        setUserData(userDataResponse);
        const isCompanyName = !isNullOrEmpty(userDataResponse.seekerCompanyName);
        const isCollegeName = !isNullOrEmpty(userDataResponse.collegeName);
        setIsSeekersCompanyOrCollegeNamePresent(isCompanyName || isCollegeName);
        setUserDataReady(true);
      }).catch((error) => {
        console.error("Error fetching seeker data:", error);
        setUserDataReady(false);
      });
    }
    fetchJobs().then((jobDataResponse) => {
      setJobData(jobDataResponse);
      setJobDataReady(true);
    }).catch((error) => {
      console.error("Error fetching job data:", error);
      setJobDataReady(false);
    });
  }, [userType]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (isLoggedIn && jobId !== undefined) {
    return <Navigate to="/description" state = {{ jobId: jobId }} />;
  }

  return (
    <div className="dashboard">
      <div className="sideMenu">
        <Sidemenu />
      </div>
      <div className="mainContent">
        {isEmployee && !isEmployeesCompanyNamePresent && (
            <div className="inputOverlay">
              <CompanyNameInput onSubmit={handleCompanyNameSubmit} />
            </div>
          )}
        {isSeeker && !isSeekersCompanyOrCollegeNamePresent && (
            <div className="inputOverlay">
              <CompanyOrCollegeNameInput onSubmit={handleCompanyOrCollegeNameSubmit} />
            </div>
          )}
        <div className="topMenu">
          <TopHeading />
        </div>
        {isSeeker && userDataReady && (
          <div className="ResumeSec">
            <p style={{ display: "inline-flex", marginBottom: "10px" }}>
              Upload your Resume (Optional)
            </p>
            <div className="uploadSection">
              <FileUploader />
              <p>Resume can be in pdf, doc, docs format. File size up to 5Mb</p>
            </div>
          </div>
        )}
        <div className="RefferalChart">
          {userDataReady && jobDataReady && <RenderUsersInCards userData = {userData} jobData = {jobData}/>}
        </div>
        <div className="appliedJob">{isSeeker && userDataReady && jobDataReady && <SeekerJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="appliedJob">{isEmployee && userDataReady && jobDataReady && <EmployeeJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="FeaturedJob">
          {jobDataReady && <RenderJobsInCards jobData={jobData}/>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
