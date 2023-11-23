import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import NavbarCmp from "./components/Navbar/Navbar";
import AddJob from "./pages/AddJob";
import AdminDashboard from "./pages/AdminDashboard";
import EditJob from "./pages/EditJob";
import GetAllJobs from "./pages/getAllJobs";
import GetAllSeekers from "./pages/GetAllSeekers";
import AddSeeker from "./pages/AddSeeker";
import AddEmployee from "./pages/AddEmployee";
import GetAllEmployees from "./pages/GetAllEmployee";
import JobList from "./pages/JobList";
import JobPost from "./pages/jobPost";
import Cookies from "js-cookie";
import Description from "./components/Job Details/Description";
import ShortListedCandidatesList from "./pages/ShortListedCandidatesList";
import { Navigate } from "react-router-dom";
import "./pages/index.css";
import ForgotPassword from "./components/ForgotPassword";
import * as Constants from "./constants/String"

function App() {
  window.scrollTo(0, 0);
  const location = useLocation();

  const userId = Cookies.get(Constants.userId);
  const isLoggedIn = userId !== undefined && userId !== "";

  const isDashboardPage =
    location.pathname.includes("/dashboard") ||
    (isLoggedIn && location.pathname === "/");
  return (
    <div className="w-screen flex flex-col app">
      {!isDashboardPage && <NavbarCmp />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/shortListedCandidatesList" element={<ShortListedCandidatesList />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/addSeeker" element={<AddSeeker />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/getEmployee" element={<GetAllEmployees />} />
        <Route path="/getJobs" element={<GetAllJobs />} />
        <Route path="/getSeekers" element={<GetAllSeekers />} />
        <Route path="/edit" element={<EditJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/internship" element={<JobList type="Internship" />} />
        <Route path="/jobPost" element={<JobPost />} />
        <Route path="/description" element={<Description />} />
        <Route path="/seeker/login/forgotPassword" element={<ForgotPassword userType={"seeker"}/>} />
        <Route path="/employee/login/forgotPassword" element={<ForgotPassword userType={"employee"}/>} />
        <Route
          path="/employee/login"
          element={<Login userType={"employee"} />}
        />
        <Route path="/seeker/login" element={<Login userType={"seeker"} />} />
        <Route
          path="/employee/signup"
          element={<Signup userType={"employee"} />}
        />
        <Route path="/seeker/signup" element={<Signup userType={"seeker"} />} />
        <Route path="/joblist" element={<JobList type="Job"/>} />
      </Routes>
    </div>
  );
}

export default App;
