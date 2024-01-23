
import React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/jobPost.css"
import "../pages/index.css"
import { toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import * as Constants from "../constants/String";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const JobPost = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [noOfOpenings, setNoOfOpenings] = useState("");
    const [experienceRequired, setExperienceRequired] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [keyQualifications, setKeyQualifications] = useState("");
    const [expectedPackage, setExpectedPackage] = useState("");
    const [employmentType, setEmploymentType] = useState("Full-time");
    const [jobType, setJobType] = useState("Work From Office");
    const [selectedOption, setSelectedOption] = useState("Yearly");
    const [additionalRequirement, setAdditionalRequirement] = useState("");
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (valueSetter) => (e) => {
        valueSetter(e.target.value);
        checkFormCompletion();
    };
 

    const checkFormCompletion = () => {
        const isJobTitleFilled = jobTitle.trim() !== '';
        const isJobDescriptionFilled = jobDescription.trim() !== '';
        const isKeyQualificationsFilled = keyQualifications.trim() !== '';
        // const isEmploymentTypeFilled = validateForm();
        // const isJobTypeFilled = validateJobTypeForm();
        // const isSalaryOptionChange = validateSalForm();
         const isEmploymentTypeFilled = employmentType !== '';
        const isJobTypeFilled = jobType !== '';
        const isSalaryOptionChange = selectedOption !== '';
        const isamountFilled = expectedPackage.trim() !== '';
        const isFormComplete = isJobTitleFilled && isJobDescriptionFilled && isKeyQualificationsFilled && isEmploymentTypeFilled
            && isSalaryOptionChange && isamountFilled && isJobTypeFilled;
        setIsFormComplete(isFormComplete);
    };

    const handleAmountKeyPress = (event) => {
        const keyCode = event.which ? event.which : event.keyCode;
        const isValidKey = /^[0-9]+$/.test(String.fromCharCode(keyCode));
        if (!isValidKey) {
            event.preventDefault();
        }
    };
    const setInputsEmpty = () => {
        setJobTitle("");
        setJobPosition("");
        setJobDescription("");
        setKeyQualifications("");
        setExpectedPackage("");
        setSelectedOption("");
        setAdditionalRequirement("");
        setIsFormComplete(false);
        setEmploymentType("");
        setJobType("");
        setJobLocation("");
        setNoOfOpenings("");
        setExperienceRequired("");
    }

    const handlePostJob = () => {
        setIsLoading(true);
        const companyName = Cookies.get(Constants.companyName)
        if (!companyName) {
            toast("Please Login!");
             setIsLoading(false);
             return;
        }
        const userId = Cookies.get(Constants.userId);
        const token = Cookies.get(Constants.token);
        const headers = {
            authorization: `Bearer ${token}`,
        };
        const formData = {
            companyName: companyName,
            employeeId: userId,
            jobTitle: jobTitle,
            jobLocation: jobLocation,
            noOfOpenings: noOfOpenings,
            experienceRequired: experienceRequired,
            jobDate: new Date(),
            jobRequirements: jobDescription,
            jobEligibility: keyQualifications,
            expectedPackage: parseFloat(expectedPackage),
            applyLink: additionalRequirement,
            employmentType: employmentType,
            jobType: jobType
        };
        axios
            .post(`${apiUrl}/api/v1/jobs/create`, formData)
            .then((res) => {
                toast.success("Job Posted Successfully");
                axios.get(
                    `${apiUrl}/api/v1/employees/${userId}`
                    , { headers })
                    .then((res) => {
                        const stringifiedUserDetails = JSON.stringify(res.data.employee);
                        sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);
                        axios.post(`${apiUrl}/api/v1/jobs/`)
                            .then((jobListResp) => {
                                const updatedJobList = jobListResp.data;
                                const updatedJobListString = JSON.stringify(updatedJobList);
                                sessionStorage.setItem("hiringShala_jobList", updatedJobListString);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                    .catch((e) => {
                        if (e.response) {
                            toast.error(e.response.data.msg);
                        } else if (e.request) {
                            toast.error("Network failure or timeout");
                        } else {
                            toast.error("An unexpected error occurred");
                        }
                    });
                setTimeout(() => {
                    const form = document.getElementById("jobPostForm"); // Replace "your-form-id" with the actual ID of your form

                    // Reset each input field
                    const inputFields = form.querySelectorAll("input");
                    inputFields.forEach((input) => {
                        input.value = "";
                    });
                    const textareaFields = form.querySelectorAll("textarea");
                    textareaFields.forEach((textarea) => {
                        textarea.value = "";
                    });
                    setInputsEmpty();
                    // window.location.reload();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 2000);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.msg);
                } else if (error.request) {
                    toast.error("Network failure or timeout");
                } else {
                    toast.error("An unexpected error occurred");
                }
            });
    };

    return (

        <div className="container addJobText" id="jobPostForm" >
            <h2 className="text-primary font-weight-bold post-job-title" style={{ fontWeight: "bold", fontSize: "24px", marginTop: "100px", marginBottom: "70px" }}>Post New Job Opening</h2>
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job Title <sup className="required-field">*</sup>
                    </p>
                    <p> Enter the specific name or designation of the job position you are hiring for.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">

                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={jobTitle}
                            required
                            placeholder="Enter job title e.g Business Analyst"
                            onChange={handleInputChange(setJobTitle)} 
                            className="form-control"
                        />
                    </div>
                </div>

            </div>
            <hr style={{ borderTop: "1px solid black" }} />

            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job Location
                    </p>
                    <p> Enter the location for the Job posting.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">

                        <input
                            type="text"
                            id="jobLocation"
                            name="jobLocation"
                            value={jobLocation}
                            placeholder="Enter the location for Job posting e.g. Bengaluru, Karnataka"
                            onChange={handleInputChange(setJobLocation)} 
                            className="form-control"
                        />
                    </div>
                </div>

            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job ID
                    </p>
                    <p> Enter the unique identification number or code assigned to this job posting.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">
                        <input
                            type="text"
                            id="jobPosition"
                            name="jobPosition"
                            value={jobPosition}
                            placeholder="Enter job ID e.g. 20003749"
                        onChange={handleInputChange(setJobPosition)} 
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                      Number Of Openings
                    </p>
                    <p> Enter the number of openings for this job posting.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">

                        <input
                            type="text"
                            id="noOfOpenings"
                            name="noOfOpenings"
                            value={noOfOpenings}
                            placeholder="Enter the number of Openings e.g. 10"
                            onChange={handleInputChange(setNoOfOpenings)} 
                            className="form-control"
                        />
                    </div>
                </div>

            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold job-description-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Job Description <sup className="required-field">*</sup></h4>
                        <p className="job-description-text">Provide a short description of the job. Keep it short and to the point.</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={jobDescription}
                        placeholder="Enter job description"
                        required
                       onChange={handleInputChange(setJobDescription)} 
                        className="form-control job-description-textarea"
                        rows={10}
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                      Experience required
                    </p>
                    <p> Enter the experience needed to apply for this job.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">

                        <input
                            type="text"
                            id="experienceRequired"
                            name="experienceRequired"
                            value={experienceRequired}
                            placeholder="Enter the experience required e.g. 1 year"
                            onChange={handleInputChange(setExperienceRequired)} 
                            className="form-control"
                        />
                    </div>
                </div>

            </div>


            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className=" col-md-6 ">
                    <div className="mb-4">
                        <h4 className="font-weight-bold key-qualification-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Key Qualifications <sup className="required-field" >*</sup></h4>
                        <p className=" allcheckbox" >Provide candidate requirements for this job, including qualifications, etc.</p>
                    </div>
                </div>
                <div className="col-md-6 textarea-container-keyQualification-textarea" >
                    <textarea
                        id="keyQualifications"
                        name="keyQualifications"
                        value={keyQualifications}
                        placeholder="Enter qualifications"
                        required
                        onChange={handleInputChange(setKeyQualifications)} 
                        className="form-control textarea"
                        rows={10}
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>


            <hr style={{ borderTop: "1px solid black", margin: "20px 0" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <p className="font-weight-bold fs-4 employement-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Employment Type <sup className="required-field">*</sup></p>
                        <p className="employement-title">Provide type of Employment</p>
                    </div>
                </div>

                <div className="col-lg-7 employmentType">
                    <div className={`form-control empContentbox ${employmentType === 'Full-time' ? 'selected' : ''}`} onClick={() => setEmploymentType('Full-time')}>
                        <input type="checkbox" id="checkbox1" value="Full-time" className="checkbox-input" checked={employmentType === "Full-time"}  onChange={handleInputChange(setEmploymentType)}  />
                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Full-time</span>
                    </div>

                    <div className={`form-control empContentbox ${employmentType === 'Internship' ? 'selected' : ''}`} onClick={() => setEmploymentType('Internship')}>
                        <input type="checkbox" id="checkbox2" value="Internship" className="checkbox-input" checked={employmentType === "Internship"} onChange={handleInputChange(setEmploymentType)} />
                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Internship</span>
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black", margin: "20px 0" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <p className="font-weight-bold fs-4 employement-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Job Type <sup className="required-field">*</sup></p>
                        <p className="employement-title">Provide type of Job</p>
                    </div>
                </div>

                <div className="col-lg-7 employmentType">
                    <div className={`form-control empContentbox ${jobType === 'Work From Office' ? 'selected' : ''}`} onClick={() => setJobType('Work From Office')}>
                        <input type="checkbox" id="jobType1" value="Work From Office" className="checkbox-input" checked={jobType === "Work From Office"}onChange={handleInputChange(setJobType)} />
                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Work From Office</span>
                    </div>

                    <div className={`form-control empContentbox ${jobType === 'Remote' ? 'selected' : ''}`} onClick={() => setJobType('Remote')}>
                        <input type="checkbox" id="jobType2" value="Remote" className="checkbox-input" checked={jobType === "Remote"} onChange={handleInputChange(setJobType)}  />
                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Remote</span>
                    </div>
                    <div className={`form-control empContentbox ${jobType === 'Hybrid' ? 'selected' : ''}`} onClick={() => setJobType('Hybrid')}>
                        <input type="checkbox" id="jobType3" value="Hybrid" className="checkbox-input" checked={jobType === "Hybrid"}  onChange={handleInputChange(setJobType)}  />
                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Hybrid</span>
                    </div>
                </div>
            </div>


            <hr style={{ borderTop: "1px solid black" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold Salary-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Salary <sup className="required-field">*</sup></h4>
                        <p className=" allcheckbox" >Choose the salary for this job</p>
                    </div>
                </div>
                <div className="col-lg-7 salaryBox">
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox5" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="form-control empContentbox" >
                                <input type="checkbox" id="checkbox5" name="salaryType"
                                    value="Monthly" className="checkbox-input" checked={selectedOption === "Monthly"}  onChange={handleInputChange(setSelectedOption)}  />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Monthly</span>
                            </div>
                        </label>

                    </div>
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox6" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="form-control  empContentbox">
                                <input type="checkbox" id="checkbox6" className="checkbox-input" name="salaryType"
                                    value="Yearly" checked={selectedOption === "Yearly"}  onChange={handleInputChange(setSelectedOption)}   />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Yearly</span>
                            </div>
                        </label>

                    </div>


                </div>
            </div>

         <hr style={{ borderTop: "1px solid black" }} />
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Expected Package <sup className="required-field">*</sup>
                    </p>
                    <p> Enter the expected package for this job post.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">
                        <input
                              type="text"
                            value={expectedPackage}
                           onChange={handleInputChange(setExpectedPackage)} 
                            onKeyPress={handleAmountKeyPress}
                            placeholder="Enter expected package"
                            className="form-control"
                            required
                            id="expectedpackage"
                        />
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold additional-requirments-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Additional Requirements</h4>
                        <p className=" job-description-text">Provide additional requirements if any</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className=" textarea-container">
                        <textarea
                            id="additionalRequirement"
                            name="additionalRequirement"
                            value={additionalRequirement}
                            onChange={handleInputChange(setAdditionalRequirement)} 
                            placeholder="Provide additional requirements if any"
                            className="form-control additional-textarea"
                            rows={10}
                            style={{ resize: 'none' }}
                        />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "50px",
                            marginBottom: "60px"

                        }}>



                        <button
                            onClick={handlePostJob}
                            className={`post-job-button ${isFormComplete ? "cursor-pointer" : "cursor-not-allowed"
                                }`}
                            disabled={!isFormComplete}
                            onMouseOver={(e) => {
                                if (!isFormComplete) {
                                    e.currentTarget.style.backgroundColor = "#b3e6cc";
                                    e.currentTarget.style.cursor = "not-allowed";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isFormComplete) {
                                    e.currentTarget.style.backgroundColor = "#e0e0e0";
                                    e.currentTarget.style.cursor = "default";
                                }
                            }}
                        >
                            {isLoading ? "Posting..." : "Post New Job"}
                        </button>
                    </div>
                </div>
             </div>
             </div>
            



        



    );
};

export default JobPost;