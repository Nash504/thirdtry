import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <header>
          <h1>
            MedAid<span style={{ color: "blue" }}>+</span>
          </h1>
          <i>
            <p>Your instant medical assistance app</p>
          </i>
        </header>

        <nav className="nav-links">
          <Link to="/login" className="nav-button">
            Login
          </Link>
          <Link to="/first-aid" className="nav-button secondary">
            First Aid
          </Link>
          <Link to="/sos" className="nav-button secondary">
            SOS Emergency
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
