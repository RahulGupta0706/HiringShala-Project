import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function AddSeeker() {
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post(`${apiUrl}/api/v1/seekers/`, form).then((response) => {
      if (response.status === 201) {
        swal({
          title: "Added",
          text: "Seeker Added Successfully",
          icon: "success",
          button: "OK!",
        });
        setForm({});
      } else {
        swal({
          title: "Failed",
          text: "Seeker Could not be added",
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
        style={{ backgroundColor: "#8fc4b7", marginTop: "100px" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Add a new Seeker
                  </h3>
                  <form
                    className="px-md-2"
                    id="formData"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        name="seekerName"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your Name"
                        name="password"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="seekerEmail"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Resume URL
                      </label>
                      <input
                        type="url"
                        placeholder="Enter resume url"
                        name="resumeUrl"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        College Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter College Name"
                        name="collegeName"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Company Name"
                        name="seekerCompanyName"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1q">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        placeholder="Enter the contact number"
                        name="contactNumber"
                        onChange={handleForm}
                        id="form3Example1q"
                        className="form-control"
                        autoComplete="off"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                    >
                      Submit
                    </button>
                    <Link to="/admin">
                      <button
                        className="btn btn-success btn-lg mb-1 position-absolute top-0 end-0"
                        style={{ marginTop: "20px", marginRight: "20px" }}
                      >
                        Back to Dashboard
                      </button>
                    </Link>
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

export default AddSeeker;
