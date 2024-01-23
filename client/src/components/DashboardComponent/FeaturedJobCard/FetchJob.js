import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const fetchJobs = async () => {
  try {
    const stringifiedJobList = sessionStorage.getItem("hiringShala_jobList");
    var updatedJobList = JSON.parse(stringifiedJobList);
    if (stringifiedJobList === null) {
      await axios.post(`${apiUrl}/api/v1/jobs/`)
        .then((response) => {
          updatedJobList = response.data;
          const updatedJobListString = JSON.stringify(response.data);
          sessionStorage.setItem("hiringShala_jobList", updatedJobListString);
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    }
    return updatedJobList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchJobs;
