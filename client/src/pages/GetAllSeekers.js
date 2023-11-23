import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Cookies from "js-cookie";
import swal from "sweetalert";
import axios from "axios";
import * as Constants from "../constants/String"

const token = Cookies.get(Constants.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function GetAllSeekers() {
  const [seekers, setSeeker] = useState([]);

  // const[active,setActive]=useState(false);

  const GetAll = async () => {
    axios
      .get(`${apiUrl}/api/v1/seekers/`, {headers})
      .then((response) => setSeeker(response.data));
  };

  const handleDelete = async (e, id) => {
    const deletBtn = e.currentTarget;
    deletBtn.innerText = "Deleting";

    const url = `${apiUrl}/api/v1/seekers/${id}`;

    axios.delete(url).then((response) => {
      if (response.status === 200) {
        deletBtn.closest("tr").remove();
        swal({
          title: "Deleted",
          text: "Seeker Deleted Successfully",
          icon: "success",
          button: "OK!",
        });
      } else {
        swal({
          title: "Failed",
          text: "Seeker Could not be Deleted",
          icon: "failure",
          button: "OK",
        });
      }
    });
  };

  useEffect(() => {
    GetAll();
  }, []);

  return (
    <div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Resume Url</th>
            <th scope="col">College Name</th>
            <th scope="col">Company Name</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {seekers.map((seeker) => (
            <tr key={seeker._id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{seeker.seekerName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{seeker.seekerEmail}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{seeker.resumeUrl}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{seeker.collegeName}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{seeker.seekerCompanyName}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{seeker.contactNumber}</p>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(e, seeker._id)}
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

export default GetAllSeekers;
