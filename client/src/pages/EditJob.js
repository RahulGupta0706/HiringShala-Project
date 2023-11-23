import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function EditJob() {
  const location = useLocation();
  const job = location.state?.job;

  const [jobStatus, setJobStatus] = useState(false);
  const [form, setForm] = useState({});

  const renderInput = (label, name, type, placeholder, defaultValue) => {
    return (
      <>
        <label className="form-label" htmlFor="form3Example1q">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleForm}
          defaultValue={defaultValue}
          id="form3Example1q"
          className="form-control"
          autoComplete="off"
        />
      </>
    );
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setJobStatus(e.target.checked);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    form["isExpired"] = jobStatus;

    const url = `${apiUrl}/api/v1/jobs/${id}`;

    axios.patch(url, form).then((response) => {
      if (response.status === 200) {
        swal({
          title: "Updated",
          text: "Job Updated Successfully",
          icon: "success",
          button: "OK!",
        });
        setForm({});
      } else {
        swal({
          title: "Update Failed",
          text: "Job Updation Failed",
          icon: "error",
          button: "OK",
        });
      }
    });

    document.getElementById("formData").reset();
  };

  return (
    <div>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#8fc4b7" }}
      >
        <div className="container py-5 h-100">
          <Link to="/getJobs">
            <button
              className="btn btn-success btn-lg mb-1 position-absolute top-0 end-0"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              Back
            </button>
          </Link>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Edit Job Details
                  </h3>
                  <form
                    id="formData"
                    className="px-md-2"
                    autoComplete="off"
                    onSubmit={(e) => handleSubmit(e, job._id)}
                  >
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Company Name",
                        "companyName",
                        "text",
                        "Enter Company Name",
                        job.companyName
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Requirements",
                        "jobRequirements",
                        "text",
                        "Enter job requirements",
                        job.jobRequirements
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Eligibility",
                        "jobEligibility",
                        "text",
                        "Enter Eligibility Criteria",
                        job.jobEligibility
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Location",
                        "jobLocation",
                        "text",
                        "Enter Job Location",
                        job.jobLocation
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Expected Package",
                        "expectedPackage",
                        "number",
                        "Enter ctc",
                        job.expectedPackage
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Apply Link",
                        "applyLink",
                        "url",
                        "Enter the apply link here",
                        job.applyLink
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Number of Openings",
                        "numberOfOpenings",
                        "text",
                        "Enter the number of opening",
                        job.numberOfOpenings
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Date",
                        "jobDate",
                        "date",
                        "Enter the date",
                        job.jobDate ? job.jobDate.substring(0, 10) : ""
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name="isExpired"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={handleCheck}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Job Expired
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditJob;
