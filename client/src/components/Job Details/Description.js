import React, { useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import axios from 'axios';
import Marquee from "react-fast-marquee";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import * as Constants from "../../constants/String"
import FileUploader from "../../components/FileUploader/FileUploader";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const stringifiedJobList = sessionStorage.getItem("hiringShala_jobList");
const cachedJobList = JSON.parse(stringifiedJobList);

const JobDescription = () => {
  const location = useLocation();
  const jobid = location.state?.jobId;
  const seekerId = Cookies.get(Constants.userId)
  const userType = Cookies.get(Constants.userType);
  const isLoggedIn = seekerId !== undefined && seekerId !== "";
  const navigate = useNavigate();
  const [applyJobLoading, setapplyJobLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [uploadResumeView, showUploadResumeView] = useState(false);

  const fetchCompanyDetails = useCallback(() => {
    let jobDescription = cachedJobList?.find(job => job._id === jobid);
    if (jobDescription === undefined) {
      toast.error('Error Fetching Job Description');
    }
    setCompanyDetails(jobDescription);
  }, [jobid]);

  const getApplicationStatus = useCallback(() => {
    if (userType === "employee") {
      setApplicationStatus(false);
    }
    else {
      const stringifiedUserData = sessionStorage.getItem("hiringShala_user");
      if (stringifiedUserData != null) {
        const cachedUserDetails = JSON.parse(stringifiedUserData);
        const foundSeeker = cachedUserDetails.appliedJobList.find(job => job.jobId === jobid);
        setApplicationStatus(foundSeeker);
      }
    }
  }, [userType, jobid]);

  useEffect(() => {
    fetchCompanyDetails();
    getApplicationStatus();
  }, [fetchCompanyDetails, getApplicationStatus]);

  const uploadResumeCallBack = (error) => {
    showUploadResumeView(error);
    if (!error) {
      toast.success("Resume uploaded successfully.");
    }
  }

  const applyJobFlow = () => {
    const userId = Cookies.get(Constants.userId);
    const token = Cookies.get(Constants.token);
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const formData = {
      jobId : jobid
    };
    axios
        .patch(`${apiUrl}/api/v1/seekers/apply/${seekerId}`, formData)
      .then((res) => {
          setapplyJobLoading(false);
          toast.success("Applied SuccessFully");
          setApplicationStatus(true);
          axios.get(
            `${apiUrl}/api/v1/seekers/${userId}`
            , { headers })
            .then((res) => {
              const stringifiedUserDetails = JSON.stringify(res.data.seeker);
              sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);  
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

  const applyForReferalFlow = () => {
    if (userType === "employee") {
      return toast.error("Login as a Job Seeker to Apply");
    }
    if (isLoggedIn) {
      const stringifiedUserData = sessionStorage.getItem("hiringShala_user");
      const userDetails = JSON.parse(stringifiedUserData);
      if (userDetails.resumeUrl === "" || userDetails.resumeUrl === undefined) {
        showUploadResumeView(true);
        return;
      }
      setapplyJobLoading(true);
      applyJobFlow();
    }
    else {
      navigate("/seeker/login", { state: { jobId: jobid } });
    }
  };

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  const {
    companyName,
    jobTitle,
    jobDate,
    jobLocation,
    expectedPackage,
    jobEligibility,
    jobRequirements,
    seekersRegistered,
    jobId,
    noOfOpenings,
    isExpired,
    jobType,
  } = companyDetails;

  const formattedJobDate = jobDate ? new Date(jobDate).toLocaleDateString() : '';
  const sentences = jobRequirements.split(". ");

  return (
    <>
      {uploadResumeView && (
          <div className="resumeOverlay">
            <div className="ResumeSec">
            <p>
              Upload your Resume to Apply
            </p>
            <div className="uploadResume">
              <FileUploader callback={uploadResumeCallBack}/>
              <p>Resume can be in pdf, doc, docs format. File size up to 5Mb</p>
            </div>
          </div>
        </div>)
      }
   <div className="lg:m-20 xl:m-20 max-sm:mx-3 max-sm:mt-16 max-sm:mb-10 bg-white shadow-lg  shadow-slate-950 ">
    <h6 className="italic lg:text-xs xl:text-xs text-[8px] text-center text-teal-600 mt-2 mr-2 ">Grab your dream job on Hiring Shala at...</h6>
      <div className=" h-full w-full">
       <div>
        <div className=" lg:mt-3 xl:mt-3 mt-12 p-2 text-center text-4xl lg:text-5xl font-semibold font-sans text-teal-600 drop-shadow-lg shadow-gray-700/60">{companyName}</div>
      </div>
       <div className="text-center lg:text-2xl xl:text-2xl text-xl leading-snug mt-2 text-gray-600">{companyName} is hiring for {jobTitle} at {jobLocation}.</div>
    <div className="container my-24 mx-auto md:px-6">
  <section className="mb-0 text-center">

    <div className="grid lg:grid-cols-3 lg:gap-x-12">
      <div className="mb-0 lg:mb-0">
        <div
          className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-teal-300 p-4 text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <div className=" flex flex-wrap items-center justify-center gap-x-2">
          <div className="flex flex-wrap -space-x-0 overflow-hidden ">
          </div>
         </div>
            <h4 className="mb-2  font-medium">Seekers Registered</h4>
            <p className="mb-4 text-3xl font-bold text-teal-600">
            {seekersRegistered.length}
            </p>
          </div>
        </div>
      </div>

      <div classname="mb-0 lg:mb-0">
        <div
          className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-teal-300 p-4 text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h4 className="mb-2  font-medium">Job Type</h4>
            <p className="mb-4 text-3xl font-bold text-teal-600">
              {jobType}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div
          className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-teal-300 p-4 text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h4 className="mb-2  font-medium">Job Role</h4>
            <p className="mb-4 text-3xl font-bold text-teal-600">
            {jobTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
 <div className="w-full  mt-0">
      <Marquee className="pt-2 h-[4vh]  bg-teal-500 w-full">
    <ul className="flex gap-x-2 ml-2 mr-20 ">
      <li className="text-white font-sans font-medium text-[18px] list-disc">Job Published On:</li>
      <li className="text-white font-sans font-medium text-[18px] ">{formattedJobDate}</li>
    </ul>
    {isExpired ? (
      <div>
        <ul className="flex ml-2 gap-x-2">
          <li className="text-white font-sans font-medium text-[18px] list-disc">Vacancy Status:</li>
          <li className="text-white font-sans font-medium text-[18px]">The Job vacancy is Expired</li>
        </ul>
      </div>
    ) : (
      <div>
        <ul className="flex ml-2  gap-x-2">
          <li className="text-white font-sans font-medium text-[18px] list-disc">Job Status:</li>
          <li className="text-white font-sans font-medium text-[18px]">Job Application is Open, apply for quick referral.</li>
        </ul>
      </div>
    )}
  </Marquee>
  </div>
    <div className=" w-full mt-4"> 

    {jobRequirements && (
     <div>
       <div className="text-teal-600  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium   ml-2 xl:ml-10 lg:ml-10 mr-3">Job Requirements</div>
       <ul className="bullet-list">
         {sentences.map((sentence, index) => (
           <li key={index} className="text-teal-800 mr-8 ml-2">{sentence}</li>
         ))}
       </ul>
     </div>
   )}    
   {jobEligibility && (
     <div>
       <div className="text-teal-600  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium   ml-2 xl:ml-10 lg:ml-10 mr-3">Job Eligibility</div>
       <ul>
         <li className="text-teal-800 ml-6">{jobEligibility}</li>
       </ul>
     </div>
   )}

      <span className="flex justify-center mb-10">
      <button className="apply-button bg-indigo-600 shadow-md shadow-gray-700/60" onClick={event=>applyForReferalFlow()} disabled = {applicationStatus}>
      {!applicationStatus ? applyJobLoading ? "Applying..." : "Apply For Referral" : "Applied!" }
      </button>
    </span>
      </div> 
    </div>
   </div>
      <Footer />
      <div/>
   </>
  );
};
export default JobDescription;                                 