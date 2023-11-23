import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo_light from "../assets/Logo_light.png";
import Cookies from "js-cookie";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";
import * as Constants from "../../constants/String"

function NavbarCmp() {
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
        fixed="top"
        expand="sm"
        className="custom-navbar"
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
              src={Logo_light}
              alt="Expand"
              width="140"
              height="70" />
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ color: isDark ? "white" : "black", backgroundColor: isDark ? "white" : "transparent" }} />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto">
            <div className="nav-links-container mt-2 -mb-4">
              <ul className="xl:flex xl:flex-row xl:gap-x-7 lg:flex lg:flex-row lg:gap-x-5 md:flex md:flex-row md:gap-x-6">
                <li>
                  {isLoggedIn ? (
                    <Nav.Link as={Link} to="/dashboard" onClick={handleSelect}>
                      Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/" onClick={handleSelect}>
                      Home
                    </Nav.Link>
                  )}
                </li>
                <li>
                  <Nav.Link as={Link} to="/about" onClick={handleSelect}>
                    About
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/contact-us" onClick={handleSelect}>
                    Contact Us
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist" onClick={handleSelect}>
                    Jobs
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/internship" onClick={handleSelect}>
                    Internships
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="moon-button" onClick={toggleDarkTheme}>
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
                        <FaMoon fontSize={15} />
                      </button>
                    )}
                  </Nav.Link>
                </li>
              </ul>
            </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCmp;
