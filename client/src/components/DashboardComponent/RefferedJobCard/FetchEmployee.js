import axios from "axios";
import Cookies from "js-cookie";
import * as Constants from "../../../constants/String"

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";


const fetchEmployee = async () => {
  const token = Cookies.get(Constants.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    let stringifiedUserData = sessionStorage.getItem("hiringShala_user");
    let employeeDetails;

    if (stringifiedUserData === null) {
      const response = await axios.get(`${apiUrl}/api/v1/employees/${Cookies.get(Constants.userId)}`, { headers });
      const { employee } = response.data;
      employeeDetails = employee;
      stringifiedUserData = JSON.stringify(employee);
      sessionStorage.setItem("hiringShala_user", stringifiedUserData);
    } else {
      employeeDetails = JSON.parse(stringifiedUserData);
    }

    return employeeDetails;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return [];
  }
};

export default fetchEmployee;
