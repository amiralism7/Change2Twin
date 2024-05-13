// React Component for Charts Page
import React from "react";
import "./Charts.css";
import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const Charts = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);

  const [chartDataBarrierSpeed, setChartDataBarrierSpeed] = useState(null);
  const [chartDataGelcoatSpeed, setChartDataGelcoatSpeed] = useState(null);
  const [chartDataPressure, setChartDataPressure] = useState(null);
  const [chartDataWaterlvl2, setChartDataWaterlvl2] = useState(null);
  const [chartDataGelcoatPulse, setChartDataGelcoatPulse] = useState(null);
  const [chartDataBarrierPulse, setChartDataBarrierPulse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.16:5000/api/get_20");
        const data = response.data;

        setChartDataBarrierSpeed(formatChartDataBarrierSpeed(data));
        setChartDataGelcoatSpeed(formatChartDataGelcoatSpeed(data));
        setChartDataPressure(formatChartDataPressure(data));
        setChartDataWaterlvl2(formatChartDataWaterlvl2(data));
        setChartDataGelcoatPulse(formatChartDataGelcoatPulse(data));
        setChartDataBarrierPulse(formatChartDataBarrierPulse(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1500);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Formats the chart data for pump speed (Barrier).
   */
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
            return value.split(" ")[1];
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
            return value.split(" ")[1];
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

  /**
   * Formats the chart data for pump speed (Barrier).
   */
  const formatChartDataPressure = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.Pressure,
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
            return value.split(" ")[1];
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
        text: "Pressure",
        left: "center",
      },
    };
  };

  /**
   * Formats the chart data for Water level.
   */
  const formatChartDataWaterlvl2 = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.WaterLevel_2,
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
            return value.split(" ")[1];
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
        text: "Water Level",
        left: "center",
      },
    };
  };

  /**
   * Formats the chart data for Pulses (Barrier).
   */
  const formatChartDataBarrierPulse = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.Barr_pulses,
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
            return value.split(" ")[1];
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
        text: "Pulses (Barrier)",
        left: "center",
      },
    };
  };

  /**
   * Formats the chart data for pump speed (Barrier).
   */
  const formatChartDataGelcoatPulse = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item.Gelcoat_pulses,
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
            return value.split(" ")[1];
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
        text: "Pulses (Gelcoat)",
        left: "center",
      },
    };
  };

  return (
    <div className="charts-container">
      {/* First Row */}
      <div className="row first-row">
        <div className="section first-row-section">
          {" "}
          <button id="dashboard-button">Charts</button>
        </div>
        <div className="section first-row-section"> </div>
      </div>
      {/* Second Row */}
      <div className="row second-row">
        <div className="section second-row-section">
          {chartDataBarrierSpeed && (
            <ReactECharts
              option={chartDataBarrierSpeed}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
        <div className="section second-row-section">
          {chartDataGelcoatSpeed && (
            <ReactECharts
              option={chartDataGelcoatSpeed}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
        <div className="section second-row-section">
          {chartDataPressure && (
            <ReactECharts
              option={chartDataPressure}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
      </div>
      {/* Third Row */}
      <div className="row third-row">
        <div className="section third-row-section">
          {chartDataWaterlvl2 && (
            <ReactECharts
              option={chartDataWaterlvl2}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
        <div className="section third-row-section">
          {chartDataGelcoatPulse && (
            <ReactECharts
              option={chartDataGelcoatPulse}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
        <div className="section third-row-section">
          {chartDataBarrierPulse && (
            <ReactECharts
              option={chartDataBarrierPulse}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
