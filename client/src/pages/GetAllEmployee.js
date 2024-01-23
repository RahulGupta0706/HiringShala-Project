import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import swal from "sweetalert";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function GetAllEmployees() {
  const [emp, setEmp] = useState([]);

  // const[active,setActive]=useState(false);

  const GetAll = async () => {
    axios.get(`${apiUrl}/api/v1/employees/`).then((response) => {
      setEmp(response.data);
    });
  };

  const handleDelete = async (e, id) => {
    const deletBtn = e.currentTarget;
    deletBtn.innerText = "Deleting";
    const url = `${apiUrl}/api/v1/employees/${id}`;
    axios.delete(url).then((response) => {
      if (response.status === 200) {
        deletBtn.closest("tr").remove();
        swal({
          title: "Deleted",
          text: "Employee Deleted Successfully",
          icon: "success",
          button: "OK!",
        });
      } else {
        swal({
          title: "Failed",
          text: "Employee Could not be Deleted",
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
            <th scope="col">Company Name</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {emp.map((employee) => (
            <tr key={employee._id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{employee.employeeName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{employee.employeeEmail}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{employee.employeeCompanyName}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{employee.contactNumber}</p>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={(e) => handleDelete(e, employee._id)}
                >
                  Delete
                </button>
                <div
                  className="modal"
                  id="exampleModalCenter"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">...</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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

export default GetAllEmployees;
