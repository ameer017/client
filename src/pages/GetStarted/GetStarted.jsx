import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Homyz</span>
          <span className="secondaryText">
            Register and find super attractive price quotes from us.
            <br />
            Find your residence soon
          </span>
          <button className="button">
            <Link to='/register'>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
