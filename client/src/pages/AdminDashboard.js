import { Link } from "react-router-dom";

function LandingPage() {
  const renderCard = (linkAddr, cardTitle, buttonValue) => {
    return (
      <>
        <div
          className="card"
          style={{ width: "18rem", marginTop: "20px", marginLeft: "20px" }}
        >
          
            <div className="card-body">
              <h5 className="card-title">{cardTitle}</h5>
              <p className="card-text">
                <Link to={linkAddr}>
                  <button type="submit" className="btn btn-success btn-lg mb-1">
                    {buttonValue}
                  </button>
                </Link>
              </p>
            </div>
          
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Admin Dashboard</h1>

      {renderCard("/add", "Add a Job", "Add")}
      {renderCard("/getJobs", "Get Details of All Job", "Get")}
      {renderCard("/addSeeker", "Add a Seeker", "Add")}
      {renderCard("/getSeekers", "Get Details of All Seekers", "Get")}
      {renderCard("/addEmployee", "Add a Employee", "Add")}
      {renderCard("/getEmployee", "Get Details of All Employees", "Get")}
    </>
  );
}

export default LandingPage;
