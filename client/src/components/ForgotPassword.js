import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../components/Footer/Footer";
import LoginImg from "../components/assets/Login.png";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ForgotPassword = ({userType}) => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        changePassword: "",
        confirmPassword: "",
        otp: "",
      });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOtpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setOtpVerified] = useState(false);
    const [userId, setUserId] = useState("");
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
            if (response.data.userId) {
              // OTP verified and userId exists
              setOtpVerified(true);
              setUserId(response.data.userId);
            } else {
              // OTP verification failed, userId doesn't exist
              alert("Email Id doesn't exist. Please sign up.");
            }
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
          setButtonLoadin(false)
          return;
        }
        const apiUrlSecondary =
        userType === "seeker" ? `/api/v1/seekers/${userId}` : `/api/v1/employees/${userId}`;
      const userData =
        userType === "seeker"
          ? {
              password: formData.changePassword,
            }
          : {
              password: formData.changePassword,
            };
      axios
        .patch(`${apiUrl + apiUrlSecondary}`, userData)
        .then(() =>{
            toast.success("Password changed successfully!! Please Login");
            userType === "seeker"
            ?  navigate(`/seeker/login`) :  navigate(`/employee/login`);
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
 return(
    <>
    <div>
          <MDBContainer fluid className="p-3 mt-20">
            <MDBRow center>
              <MDBCol size="5">
                <img src={LoginImg} alt="img" className="img-fluid" />
              </MDBCol>
  
              <MDBCol col="4" md="6">
                 <MDBContainer>
                  <h1 className=" font-semibold text-[1.875rem] leading-[2.375rem] mt-8 loginTitle ">
                  Welcome Back
                  </h1>
                  <p className="text-[1.125rem] leading[1.625rem] mt-2">
                    <span className="text-slate-900 italic loginDesc">
                    Skill seekho chahe jahaan se..
                    </span>
                    <br />
                    <span className="text-slate-900 italic loginDesc">
                    Job milega yha se...
                    </span>
                  </p>
                </MDBContainer>
         <form
         onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6"
      >
         <div>
          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              Email Address<sup className="text-red-700">*</sup>
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
            {!isOtpVerified && (
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
        {/*Change Password & Confirm Password */}
         <div className="flex gap-x-6">
          <label className="relative w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem] loginText">
              New Password<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="changePassword"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.changePassword}
              className={`outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color ${isOtpVerified ? "cursor-pointer" : "cursor-not-allowed"}`}
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
              className={`outline-none border-b-[1px] border-black w-full p-[2px] bg-transparent border-bottom-color ${isOtpVerified ? "cursor-pointer" : "cursor-not-allowed"}`}
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
          className={`w-52 h-[40px] rounded-[8px] font-medium text-white mt-6 bg-teal-600 ${isOtpVerified ? "cursor-pointer" : "cursor-not-allowed"}`}
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
          {buttonLoading ? <ClipLoader color="#36d7b7" /> : "Change Password"}
        </button>
        </form> 
        </MDBCol>
       </MDBRow>
     </MDBContainer>
      </div>
    <Footer/>
    </>
 );
};
export default ForgotPassword ;