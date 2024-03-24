// React Component for Charts Page
import React from "react";
import "./Charts.css";
import { useState } from "react";
import { useEffect } from "react";

const Charts = () => {
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
          <button id="dashboard-button">Charts</button>
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
      <div className="row second-row">
        <div className="section second-row-section"></div>
        <div className="section second-row-section"></div>
        <div className="section second-row-section"></div>
      </div>
      {/* Third Row */}
      <div className="row third-row">
        <div className="section third-row-section"></div>
        <div className="section third-row-section"></div>
        <div className="section third-row-section"></div>
      </div>
    </div>
  );
};

export default Charts;
