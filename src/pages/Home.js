import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>MedAid+</h1>
        <p>Your instant medical assistance app</p>
      </header>

      <nav className="nav-links">
        <Link to="/first-aid" className="nav-button">First Aid</Link>
        <Link to="/sos" className="nav-button">SOS Emergency</Link>
        <Link to="/login" className="nav-button">Login</Link>
      </nav>
    </div>
  );
}

export default Home;
