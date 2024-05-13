import React from "react";
import "./Dashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);

  // State to hold the temperature
  const [chartDataBarrierSpeed, setChartDataBarrierSpeed] = useState(null);
  const [chartDataGelcoatSpeed, setChartDataGelcoatSpeed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.16:5000/api/get_20");
        const data = response.data;

        setChartDataBarrierSpeed(formatChartDataBarrierSpeed(data));
        setChartDataGelcoatSpeed(formatChartDataGelcoatSpeed(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1500);
    return () => clearInterval(intervalId);
  }, []);

  const formatChartDataBarrierSpeed = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.Barrier_speedRPM,
    }));

    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    const xAxisData = formattedData.map((item) => item.datetime);
    const seriesData = formattedData.map((item) => item.speed);

    return {
      dataZoom: [
        {
          // Enable zooming inside the chart for the X axis
          type: "inside",
          filterMode: "none",
          xAxisIndex: 0,
          start: 60,
          end: 100,
        },
        {
          // Enable zooming inside the chart for the Y axis
          type: "inside",
          filterMode: "none",
          yAxisIndex: 0,
        },
      ],

      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        name: "Time",
        type: "category",
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            return value;
          },
        },
      },
      yAxis: {
        type: "value",
        name: "Speed",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: [
        {
          data: seriesData,
          type: "line",
          smooth: true,
        },
      ],
      title: {
        text: "Pump Speed (Barrier)",
        left: "center",
      },
    };
  };

  /**
   * Formats the chart data for pump speed (Gelcoat).
   */
  const formatChartDataGelcoatSpeed = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.Gelcoat_speedRPM,
    }));

    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    const xAxisData = formattedData.map((item) => item.datetime);
    const seriesData = formattedData.map((item) => item.speed);

    return {
      dataZoom: [
        {
          // Enable zooming inside the chart for the X axis
          type: "inside",
          filterMode: "none",
          xAxisIndex: 0,
          start: 60,
          end: 100,
        },
        {
          // Enable zooming inside the chart for the Y axis
          type: "inside",
          filterMode: "none",
          yAxisIndex: 0,
        },
      ],

      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        name: "Time",
        type: "category",
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            return value;
          },
        },
      },
      yAxis: {
        type: "value",
        name: "Speed",
        axisLabel: {
          formatter: "{value}",
        },
      },
      series: [
        {
          data: seriesData,
          type: "line",
          smooth: true,
        },
      ],
      title: {
        text: "Pump Speed (Gelcoat)",
        left: "center",
      },
    };
  };

  return (
    <div className="dashboard">
      {/* First Row */}
      <div className="row">
        <div className="section first-row">
          <button id="dashboard-button">Dashboard</button>
        </div>
      </div>
      {/* Second Row */}
      <div className="row second-row">
        <div className="section large">
          <img
            src="images/pump1.PNG"
            alt="pump1"
            className="pump"
            id="pump-left"
          />
        </div>

        <div className="section x-large" id="chart-left">
          {/* <BarrierSpeedChart /> */}
          {chartDataBarrierSpeed && (
            <ReactECharts
              option={chartDataBarrierSpeed}
              style={{ height: "35vh", width: "35vw", minWidth: "450px" }}
            />
          )}
        </div>
        <div className="section x-large" id="chart-right">
          {/* <GelcoatSpeedChart /> */}
          {chartDataGelcoatSpeed && (
            <ReactECharts
              option={chartDataGelcoatSpeed}
              style={{ height: "35vh", width: "35vw", minWidth: "450px" }}
            />
          )}
        </div>
        <div className="section large">
          {" "}
          <img
            src="images/pump2.PNG"
            alt="pump2"
            className="pump"
            id="pump-right"
          />
        </div>
      </div>
      {/* Third Row */}
      <div className="row third-row">
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
              <p>Pressure</p>
              <p>
                <strong>2.5 bar</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="section small">
          <div class="section-box">
            <div class="content">
              <p>Gelcoat Quantity</p>
              <p id="material-weight">1.3kg</p>
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Row */}
      <div className="row fourth-row">
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
