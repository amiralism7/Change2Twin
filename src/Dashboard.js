import React from "react";
import "./Dashboard.css";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);

  // State to hold the temperature

  return (
    <div className="dashboard">
      {/* First Row */}
      <div className="row">
        <div className="section">
          <button id="dashboard-button">Dashboard</button>
        </div>
        <div className="section">
          <p id="daily-paint">Daily Paint #: 3</p>
        </div>
        <div className="section">
          <p id="current-date"> Date: {currentDate.toLocaleDateString()}</p>
        </div>
      </div>
      {/* Second Row */}
      <div className="row">
        <div className="section large">
          <img src="images/pump1.PNG" alt="pump1" id="pump" />
        </div>
        <div className="section large">
          {" "}
          <img src="images/pump2.PNG" alt="pump1" id="pump" />
        </div>
        <div className="section x-large"></div>
      </div>
      {/* Third Row */}
      <div className="row">
        <div className="section small">
          <div class="section-box">
            <div class="content">
              <p>Gelcoat Quantity</p>
              <p id="material-weight">1.3kg</p>
            </div>
          </div>
        </div>
        <div className="section small">
          <div class="section-box">
            <div class="content">
              <p>Barrier Quantity</p>
              <p id="material-weight">2.6kg</p>
            </div>
          </div>
        </div>
        <div className="section medium">
          {" "}
          <div class="section-box-temperature">
            <div class="content-temperature">
              <p id="temp">Temperature</p>
              <p id="temperature">25°C</p>
            </div>
          </div>
        </div>
        <div className="section medium">
          {" "}
          <div class="section-box-temperature">
            <div class="content-temperature">
              <p id="temp">Pressure</p>
              <p id="temperature">2.5 bar</p>
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Row */}
      <div className="row">
        <div className="section huge">
          <div className="text-side">
            <p>
              <strong>Days Left: 15</strong>
            </p>
            <p className="countdown">Maintenance Countdown</p>
          </div>
          <div className="image-side"></div>
          <img
            className="maintenance-img"
            src="images/maintenance-countdown.PNG"
            alt="maintenance"
          />
        </div>
        <div className="section huge">
          {" "}
          <img className="spike-img" src="images/spike.PNG" alt="spike" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
