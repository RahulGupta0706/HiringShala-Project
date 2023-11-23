import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserCookies, setCookies } from "./Cookies";
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from "js-cookie";
import * as Constants from "../constants/String"

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const SignupForm = ({ userType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    otp: "",
    isGoogleLogin: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [buttonLoading, setButtonLoadin] = useState(false);
  const [verifyOtpLoading, setverifyOtpLoading] = useState(false);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const sendOtpHandler = () => {
    if (userType === "employee") {
      let domainName = formData.email.split("@")[1];
      let companyName = domainName.split('.')[0];
      if (Constants.defaultEmails.includes(companyName)){
        return toast.error("Signup through your official Email Id.");
      }
    }
    // send the email input to the server to initiate sending OTP
    setOtpLoading(true);
    axios
      .post(`${apiUrl}/api/v1/otp/send`, { email: formData.email })
      .then((response) => {
        // alert("OTP sent successfully!");
        setOtpSent(true);
        setOtpLoading(false);
      })
      .catch((error) => {
        alert("Failed to send OTP. Please try again.");
        setOtpLoading(false);
      });
  };

  const verifyOtpHandler = () => {
    setverifyOtpLoading(true);
    axios
      .post(`${apiUrl}/api/v1/otp/verify`, {
        email: formData.email,
        otp: formData.otp,
        userType: userType
      })
      .then((response) => {
        // alert("OTP Verified successfully!");
        setOtpVerified(true);
        setverifyOtpLoading(false);
      })
      .catch((error) => {
        setverifyOtpLoading(false);
        alert("Failed to verify OTP. Please try again.");
      });
  };
  function submitHandler(event) {
    event.preventDefault();
    setButtonLoadin(true);
    if (formData.changePassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setButtonLoadin(false);
      return;
    }
    const apiUrlSecondary =
      userType === "seeker" ? "/api/v1/seekers/" : "/api/v1/employees";
    const userData =
      userType === "seeker"
        ? {
            seekerName: formData.firstName + " " + formData.lastName,
            seekerEmail: formData.email,
            password: formData.password,
          }
        : {
            employeeName: formData.firstName + " " + formData.lastName,
            password: formData.password,
            employeeEmail: formData.email,
            employeeCompanyName: formData.companyName,
          };
    axios
      .post(`${apiUrl + apiUrlSecondary}`, userData)
      .then((response) => {
        const stringifiedUserDetails = JSON.stringify(userType === "seeker" ? response.data.seeker : response.data.employee);
        sessionStorage.setItem("hiringShala_user", stringifiedUserDetails); 
        if(userType === "seeker")
        {
          setUserCookies(
            formData.firstName + " " + formData.lastName,
            userType,
            response.data.seeker._id
          );
        }
        else
        {
          setUserCookies(
            formData.firstName + " " + formData.lastName,
            userType,
            response.data.employee._id
          );
        }
        Cookies.set(Constants.token, response.data.token);
        if (userType === "employee") {
          setCookies("companyName", formData.companyName);
        }
        toast.success("Account Created");
        navigate(`/dashboard`);
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
      .finally(() => {
        setButtonLoadin(false);
      });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        {/*First Name & Last Name */}
        <div className="flex  gap-x-6">
          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              First Name<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter first name"
              value={formData.firstName}
              className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              Last Name<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter last name"
              value={formData.lastName}
              className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
            />
          </label>
        </div>
        {userType !== "seeker" ? (
          <div className="flex  gap-x-6">
            <label className="w-full">
              <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
                Company Name<sup className="text-red-700">*</sup>
              </p>
              <input
                required
                type="text"
                name="companyName"
                onChange={changeHandler}
                placeholder="Enter your company name"
                value={formData.companyName}
                className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
              />
            </label>
          </div>
        ) : (
          <></>
        )}
        {/*Email address*/}
        <div>
          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
            {userType === "seeker" ? "Email Address": "Company Email address"} <sup className="text-red-700">*</sup>
            </p>
            <div className="flex items-center">
              <input
                required
                type="email"
                name="email"
                onChange={changeHandler}
                placeholder="Enter Email Address"
                value={formData.email}
                className={`outline-none border-b-[1px] ${
                  isOtpVerified
                    ? "bg-gray-200 bg-transparent border-bottom-color"
                    : "border-black bg-transparent border-bottom-color"
                }  w-full p-[2px] pr-6 `}
                readOnly={isOtpVerified}
              />
              {isOtpVerified && (
                <span className="text-gray-500 ml-2 bg-transparent border-bottom-color"></span>
              )}
            </div>
          </label>
          {formData.email && !isOtpVerified && (
            <>
              {isOtpSent ? (
                <>
                  <label className="w-full">
                    <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
                      OTP<sup className="text-red-700">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="otp"
                      onChange={changeHandler}
                      placeholder="Enter OTP"
                      value={formData.otp}
                      className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
                    />
                  </label>
                  <button
                    onClick={verifyOtpHandler}
                    className={
                      verifyOtpLoading
                        ? "w-50 h-[40px] bg-teal-400 rounded-[8px] font-medium text-white mt-6 cursor-wait"
                        : "w-28 h-[35px] bg-teal-600 rounded-[8px] font-medium text-white mt-6"
                    }
                    disabled={verifyOtpLoading}
                  >
                    {verifyOtpLoading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </>
              ) : (
                <button
                  onClick={sendOtpHandler}
                  className={
                    otpLoading
                      ? "w-50 h-[40px] bg-blue-200 rounded-[8px] font-medium text-white mt-6 cursor-wait"
                      : "w-28 h-[35px] bg-blue-500 rounded-[8px] font-medium text-white mt-6"
                  }
                  disabled={otpLoading}
                >
                  {otpLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              )}
            </>
          )}
        </div>
        {/*Create Password & Confirm Password */}
        <div className="flex gap-x-6">
          <label className="relative w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              Create Password<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
            />

            <span
              className="absolute right-[3px] top-[52px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="eye-icon" />
              ) : (
                <AiOutlineEye className="eye-icon" />
              )}
            </span>
          </label>

          <label className="relative w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              Confirm Password<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color"
            />

            {
              <span
                className="absolute right-[3px] top-[52px]  cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="eye-icon" />
                ) : (
                  <AiOutlineEye className="eye-icon" />
                )}
              </span>
            }
          </label>
        </div>
        <button
          className={`w-52 h-[40px] rounded-[8px] font-medium text-white mt-6 bg-teal-600  ${
            isOtpVerified ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={!isOtpVerified}
          onMouseOver={(e) => {
            if (!isOtpVerified) {
              e.currentTarget.style.backgroundColor = "#b3e6cc";
              e.currentTarget.style.cursor = "not-allowed";
            }
          }}
          onMouseOut={(e) => {
            if (!isOtpVerified) {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.cursor = "default";
            }
          }}
        >
          {buttonLoading ? <ClipLoader color="#36d7b7" /> : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;