import React, { useEffect, useState } from "react";
import axios from "axios";
import fetchJobs from "../components/DashboardComponent/FeaturedJobCard/FetchJob";
import Cookies from "js-cookie";
import * as Constants from "../constants/String";

const ShortListedCandidatesList = () => {
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const jobList = await fetchJobs();
                if (!jobList) {
                    return;
                }
                const employeesCompanyName = Cookies.get(Constants.companyName);
                const filteredCompanyList = jobList.filter(job => job.companyName.toLowerCase() === employeesCompanyName.toLowerCase() && job.isExpired === false);
                console.log("filteredCompanyList", filteredCompanyList);
                setCompanyList(filteredCompanyList);
            } catch (error) {
                console.error("Error fetching shortlisted candidates:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {companyList.map((job, index) => (
                <div key={index}>
                    <h2>{job.title}</h2>
                    <p>{job.jobRequirements}</p>
                    {/* Render other job details here */}
                </div>
            ))}
        </div>
    );
};

export default ShortListedCandidatesList;
