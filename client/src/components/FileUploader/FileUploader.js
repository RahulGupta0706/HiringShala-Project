import React, { useState, useEffect } from "react";
import axios from "axios";
import RoundButton from "../DashboardComponent/sidemenu/RoundButton";
import "./FileUploader.css";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import * as Constants from "../../constants/String";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function FileUploader({ callback }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      // Check if the resume is already present in sessionStorage
      const storedUserDetails = await sessionStorage.getItem(
        "hiringShala_user"
      );
      const userDetails = JSON.parse(storedUserDetails);
      if (userDetails && userDetails.resumeUrl) {
        setResumeUrl(userDetails.resumeUrl); // Set the resume URL if present
      }
    };

    fetchResume(); // Call the asynchronous function
  }, []);

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["pdf", "doc", "docx"];

    if (
      file &&
      allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
    ) {
      setSelectedFile(file);
      setError(false);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setError(true);
      setErrorMessage(
        "Invalid file format. Please select a PDF, DOC, or DOCX file."
      );
    }
  };

  const handleUpload = () => {
    const seekerId = Cookies.get(Constants.userId);
    const formData = new FormData();
    const token = Cookies.get(Constants.token);
    formData.append("file", selectedFile);
    formData.append("seekerId", seekerId);

    setLoading(true);
    axios
      .post(`${apiUrl}/api/v1/seekers/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        callback(false);
        axios
          .get(`${apiUrl}/api/v1/seekers/${seekerId}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  return (
    <div className>
      {resumeUrl ? (
        <div>
          <div onDrop={handleDrop}>
            <label htmlFor="fileInput" className="choose-file-text">
              <strong>
                {selectedFile
                  ? selectedFile.name
                  : getFileNameFromUrl(resumeUrl)}
              </strong>
              <a
                href="#"
                onClick={() => document.getElementById("fileInput").click()}
              ></a>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className=" 
          file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
          file:px-6 file:py-2 file:m-3
          file:border-none
          file:rounded-full
          file:text-white
          file:cursor-pointer
          file:shadow-md file:shadow-blue-600/50

          bg-gradient-to-br from-gray-200 to-gray-300
          text-black/80 
          rounded-full
          cursor-pointer
          "
            />
            <br></br>
            {selectedFile && (
              <RoundButton
                text={
                  loading
                    ? "Uploading..."
                    : success
                    ? "Resume Uploaded \u2713"
                    : "Upload Resume"
                }
                className={`${
                  loading
                    ? "upload-button"
                    : success
                    ? "uploaded-button"
                    : "uploaded-button"
                } ${selectedFile ? "has-file" : ""} ${
                  error ? "has-error" : ""
                } sm:rounded`}
                onClick={handleUpload}
                disabled={loading || success}
                style={{ maxWidth: "100%" }}
              />
            )}
            {error && (
              <span className="text-red-500 ml-4">
                Upload failed. Please try again.
              </span>
            )}
            {errorMessage && (
              <span className="text-red-500 ml-4">Invalid Format</span>
            )}
          </div>
        </div>
      ) : (
        <div onDrop={handleDrop}>
          <label htmlFor="fileInput" className="choose-file-text">
            <a
              href="#"
              onClick={() => document.getElementById("fileInput").click()}
            ></a>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className=" 
       file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
       file:px-6 file:py-2 file:m-3
       file:border-none
       file:rounded-full
       file:text-white
       file:cursor-pointer
       file:shadow-md file:shadow-blue-600/50

       bg-gradient-to-br from-gray-200 to-gray-300
       text-black/80 
       rounded-full
       cursor-pointer
       "
          />
          {selectedFile && (
            <RoundButton
              text={
                loading
                  ? "Uploading..."
                  : success
                  ? "Resume Uploaded \u2713"
                  : "Upload Resume"
              }
              className={`${
                loading
                  ? "upload-button"
                  : success
                  ? "uploaded-button"
                  : "uploaded-button"
              } ${selectedFile ? "has-file" : ""} ${
                error ? "has-error" : ""
              } sm:rounded`}
              onClick={handleUpload}
              disabled={loading || success}
              style={{ maxWidth: "100%" }}
            />
          )}
          {error && (
            <span className="text-red-500 ml-4">
              Upload failed. Please try again.
            </span>
          )}
          {errorMessage && (
            <span className="text-red-500 ml-4">Invalid Format</span>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUploader;
