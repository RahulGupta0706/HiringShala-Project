import React, { useState, useEffect } from "react";
import Logo_light from "../../assets/Logo_light.png";
import { Link, useNavigate } from "react-router-dom";
import "./sidemenu.css";
import { removeCookies } from "../../Cookies";
import Cookies from "js-cookie";
import * as Constants from "../../../constants/String"
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";
import { FiInstagram, FiMail, FiBriefcase, FiLogOut , FiInbox} from "react-icons/fi"; // Import the icons you want to use

const Sidemenu = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookies();
    navigate("/");
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  const userId = Cookies.get(Constants.userId);
  const userType = Cookies.get(Constants.userType);
  const isLoggedIn = userId !== undefined && userId !== "";

  const [isDark, setDark] = useState(
    Cookies.get("theme") === undefined || Cookies.get("theme") === "light"
      ? false
      : true
  );
  const [theme, setTheme] = useState(Cookies.get("theme") || "light");
  const toggleDarkTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setDark(true);
      Cookies.set("theme", "dark");
    } else {
      setTheme("light");
      setDark(false);
      Cookies.set("theme", "light");
    }
    handleSelect();
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="left"
        expand="sm"
        className="sidemenu-custom-navbar"
        variant="red"
        expanded={expanded}
        onToggle={handleToggle}
      >
        <Container>
          <Nav.Link
            as={Link}
            to={isLoggedIn ? "/dashboard" : "/"}
            className="brand-logo"
          >
            <img
              src= {Logo_light}
              alt="Expand"
              width="180"
              height="80"
              style={{ margin: "10px" }}
            />
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{
              color: isDark ? "white" : "black",
              backgroundColor: isDark ? "white" : "transparent",
            }}
          />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto1">
              <ul className="side">
              <li>
                  <Nav.Link as={Link} to="/jobpost" onClick={handleSelect} style={{ visibility: userType === "employee" ? "visible" : "hidden" }}>
                    <FiInbox className="navbar-icon" /> Post Job
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/contact-us" onClick={handleSelect}>
                    <FiMail className="navbar-icon" /> Contact Us
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist" onClick={handleSelect}>
                    <FiBriefcase className="navbar-icon" /> Jobs
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist" onClick={handleSelect}>
                    <FiBriefcase className="navbar-icon" /> Internships
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/shortListedCandidatesList" onClick={handleSelect}>
                    <FiInstagram className="navbar-icon" /> Referrals
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="logout-button" onClick={handleLogOut}>
                    <FiLogOut className="navbar-icon-logout" /> Logout
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="sidemenu-moon-button" onClick={toggleDarkTheme}>
                    {isDark ? (
                      <button
                        className="btn btn-dark"
                        id="modeToggler"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Switch to Light Mode"
                      >
                        <BiSun fontSize={20} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-light"
                        id="modeToggler"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Switch to Dark Mode"
                      >
                        <FaMoon fontSize={20} />
                      </button>
                    )}
                  </Nav.Link>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidemenu;
