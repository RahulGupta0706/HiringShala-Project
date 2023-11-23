import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Buttons";
import { Container, Row, Col } from "react-bootstrap";
import HomeImg from "../components/assets/home-page-img1.png";
import ApplyImg from "../components/assets/apply-for-referral.png";
import ContactImg from "../components/assets/contact-us.png";
import SearchJob from "../components/assets/job-search.png";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/jobList");
  };

  const renderCard = (cardTitle, buttonValue, ImgSrc) => {
    return (
      
      <div className="card" onClick={handleClick}>
        <img src={ImgSrc} alt="img" />
        <div className="card-body card-content">
          <h3 className="card-title">{cardTitle}</h3>
          <p>
            the largest pool of career opportunities that match your skill set.
            link up with outstanding people to create a better future.
          </p>
        </div>
        <button type="submit" className="btn card-button">
          {buttonValue}
        </button>
      </div>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="container-col">
            <img src={HomeImg} alt="img" className="home-img" />
          </Col>
          <Col className="container-col home-text">
            <Row>
              <h1 className="mb-4">Unleash your potential with HiringShala</h1>
              <p>
                the largest pool of career opportunities that match your skill
                set. link up with outstanding people to create a better future.
                the largest pool of career opportunities that match your skill
                set. link up with outstanding people to create a better future.
              </p>
            </Row>
            <Row className="buttons">
              <Button />
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="card-container">
        <Row>
          <Col className="card-col" xs={12} md={6} lg={4}>
            {renderCard("Search Job", "Search", SearchJob)}
          </Col>
          <Col className="card-col" xs={12} md={6} lg={4}>
            {renderCard("Search Internships", "Search", ApplyImg)}
          </Col>
          <Col className="card-col" xs={12} md={6} lg={4}>
            {renderCard("Apply for Referrals", "Get Referral", ContactImg)}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
