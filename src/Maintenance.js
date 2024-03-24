// React Component for Maintenance Page
import React from "react";
import "./Maintenance.css";
import { useState } from "react";
import { useEffect } from "react";

const Maintenance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);
  return (
    <div className="maintenance-container">
      {/* First Row */}
      <div className="row first-row-maintenace">
        <div className="section first-row-section-maintenace">
          {" "}
          <button id="dashboard-button">Maintenace</button>
        </div>
        <div className="section first-row-section-maintenace">
          {" "}
          <p id="current-date-maintenance">
            {" "}
            Date: {currentDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Second Row */}
      <div className="row second-row-maintenace">
        <div className="section second-row-section-maintenace">
          <div class="section-box-maintenance">
            <div class="content-maintenance">
              <p>Clean Spraygun</p>
              <p id="pump-filter-countdown">Days Left: 1</p>
            </div>
          </div>
        </div>
      </div>
      {/* Third Row */}
      <div className="row third-row-maintenace">
        <div className="section third-row-section-maintenace">
          <div class="section-box-maintenance">
            <div class="content-maintenance">
              <p>Change Pump Filters</p>
              <p id="pump-filter-countdown">Days Left: 3</p>
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Row */}
      <div className="row fourth-row-maintenace">
        <div className="section third-row-section-maintenace">
          <div class="section-box-maintenance">
            <div class="content-maintenance">
              <p>Change Pump Lines</p>
              <p id="pump-filter-countdown">Days Left: 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
