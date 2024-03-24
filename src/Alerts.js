import React from "react";
import "./Alerts.css";
import { useState } from "react";
import { useEffect } from "react";

const Alerts = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);
  return (
    <div className="charts-container">
      {/* First Row */}
      <div className="row first-row">
        <div className="section first-row-section">
          {" "}
          <button id="dashboard-button">Alerts</button>
        </div>
        <div className="section first-row-section">
          {" "}
          <p id="current-date-charts">
            {" "}
            Date: {currentDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Second Row */}
      <div className="row">
        <div className="section huge alert">
          <div className="text-side">
            <p>
              <strong>Blocked Pump Alert</strong>
            </p>
            <p id="block-notification">
              Pump is currently blocked and requires immediate attention.
            </p>
            <p className="highlight">
              View Details
              <img src="svg/eye.svg" alt="eye-icon" id="eye-svg" />
            </p>
          </div>
          <div className="image-side"></div>
          <img className="alert-img" src="images/alert.PNG" alt="alert" />
        </div>
      </div>
    </div>
  );
};

export default Alerts;
