import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import swal from "sweetalert";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function GetAllJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const GetAllJobs = async () => {
    axios.post(`${apiUrl}/api/v1/jobs/`).then((response) => {
      setJobs(response.data);
    });
  };

  const routeChange = (event, data) => {
    event.preventDefault();
    navigate("/edit", { state: { job: data } });
  };

  const handleDelete = async (e, id) => {
    const deletBtn = e.currentTarget;
    deletBtn.innerText = "Deleting";

    const url = `${apiUrl}/api/v1/jobs/${id}`;

    axios.delete(url).then((response) => {
      if (response.status === 200) {
        deletBtn.closest("tr").remove();
        swal({
          title: "Deleted",
          text: "Job Deleted Successfully",
          icon: "success",
          button: "OK!",
        });
      } else {
        swal({
          title: "Failed",
          text: "Job Could not be Deleted",
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  useEffect(() => {
    GetAllJobs();
  }, []);

  return (
    <div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Job Requirements</th>
            <th scope="col">Job Eligibility</th>
            <th scope="col">Job Location</th>
            <th scope="col">Expected Package</th>
            <th scope="col">Apply Link</th>
            <th scope="col">Number of Openings</th>
            <th scope="col">Job Date</th>
            <th scope="col">Status</th>
            <th scope="col" colSpan={"2"} style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{job.companyName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.jobRequirements}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.jobEligibility}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.jobLocation}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.expectedPackage}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.applyLink}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{job.numberOfOpenings}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {job.jobDate ? job.jobDate.substring(0, 10) : ""}
                </p>
              </td>

              <td>
                {job.isExpired ? (
                  <MDBBadge color="danger" pill>
                    Expired
                  </MDBBadge>
                ) : (
                  <MDBBadge color="success" pill>
                    Active
                  </MDBBadge>
                )}
                {/* <MDBBadge color="success" pill>
                                    {job.isExpired ? 'Expired' : 'Active'}
                                </MDBBadge> */}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(event) => routeChange(event, job)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(e, job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <Link to="/admin">
        <button
          className="btn btn-success btn-lg mb-1"
          style={{ marginLeft: "10px", marginTop: "100px" }}
        >
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default GetAllJobs;
