import axios from "axios";
import React, { useEffect, useState } from "react";
import "./jobList.css";
import JobDetails from "../components/Jobs/JobDetails";
import JobFilter from "../components/Jobs/JobFilter";
import { toast } from "react-hot-toast";
const JobList = ({ type }) => {
  const [job, setJob] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [found, setFound] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      const ind = checkedItems.indexOf(value);
      if (ind === -1) setCheckedItems([...checkedItems, value]);
    } else {
      const updatedItems = checkedItems.filter((item) => item !== value);
      setCheckedItems(updatedItems);
    }
  };

  const handleSearchInput = (event) => {
    setSearchVal(event.target.value);
  };

  const handleSearch = () => {
    if (searchVal !== "") {
      const items = job.filter(
        (currJob) =>
          currJob.jobType?.toString()?.toLowerCase() ===
            searchVal.toLowerCase() ||
          currJob.jobTitle?.toString()?.toLowerCase() ===
            searchVal.toLowerCase() ||
          currJob.companyName?.toString()?.toLowerCase() ===
            searchVal.toLowerCase() ||
          currJob.jobLocation?.toString()?.toLowerCase() ===
            searchVal.toLowerCase()
      );
      items.length === 0 ? setFound(false) : setFound(true);
      setFilteredJobs(items);
      setIsSearchPerformed(true);
    }
  };

  const handleClose = (value) => {
    const updatedItems = checkedItems.filter((item) => item !== value);
    setCheckedItems(updatedItems);
  };

  const clearSearchItems = () => {
    setFilteredJobs([]);
  };

  const clearSearchValue = () => {
    setSearchVal("");
  };

  const clearCheckedItems = () => {
    setCheckedItems([]);
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const GetAllJobs = async () => {
      const stringifiedJobList = sessionStorage.getItem("hiringShala_jobList");
      var updatedJobList = JSON.parse(stringifiedJobList);
      if (stringifiedJobList === null) {
        await axios
          .post(`${apiUrl}/api/v1/jobs/`)
          .then((response) => {
            updatedJobList = response.data;
            const updatedJobListString = JSON.stringify(response.data);
            sessionStorage.setItem("hiringShala_jobList", updatedJobListString);
          })
          .catch((error) => {
            if (error.response) {
              toast.error(error.response.data.msg);
            } else if (error.request) {
              toast.error("Network failure or timeout");
            } else {
              toast.error("An unexpected error occurred");
            }
          });
      } else setJob(updatedJobList);
      type === "Internship"
        ? setJob(updatedJobList.filter((currJob) => currJob.jobType === type))
        : setJob(updatedJobList);
      console.log(updatedJobList.filter((currJob) => currJob.jobType === type));
    };
    GetAllJobs();
  }, [type]);

  

  const jobTypeList = [
    "Remote",
    "Hybrid",
    "Part Time",
    "Contract",
  ];

  const jobCategoryList = [
    "SDE",
    "Frontend Developer",
    "Business Analyst",
    "Corporate Majdur",
  ];

  return (
    <>
      <div className="wrapper">
        <div className="input-group search-container">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search here..."
            aria-label="Search"
            value={searchVal}
            aria-describedby="search-addon"
            onChange={handleSearchInput}
          />
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          <JobFilter
            filterName="All"
            filterValue={[]}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
            clearSearchValue={clearSearchValue}
            setIsSearchPerformed={setIsSearchPerformed}
            dropdownNum={0}
          />
          <JobFilter
            filterName="Job Type"
            filterValue={jobTypeList}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
            clearSearchValue={clearSearchValue}
            setIsSearchPerformed={setIsSearchPerformed}
            dropdownNum={1}
          />
          <JobFilter
            filterName="Job Category"
            filterValue={jobCategoryList}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
            clearSearchValue={clearSearchValue}
            setIsSearchPerformed={setIsSearchPerformed}
            dropdownNum={2}
          />
          <JobFilter
            filterName="Experience"
            filterValue={["Entry Level", "0-3yrs", "3+yrs", "5+yrs"]}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
            clearSearchValue={clearSearchValue}
            setIsSearchPerformed={setIsSearchPerformed}
            dropdownNum={3}
          />
        </div>
      </div>
      <JobDetails
        job={job}
        filterValue={checkedItems}
        searchItems={filteredJobs}
        handleClose={handleClose}
        isSearchPerformed={isSearchPerformed}
        found={found}
      />
    </>
  );
};

export default JobList;
