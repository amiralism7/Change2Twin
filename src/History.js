// React Component for Charts Page

import React from "react";
import "./History.css";
import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
// import { DateRangePicker, Stack } from "rsuite";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import { FaCalendar, FaClock } from "react-icons/fa";
// import { BsCalendar2MonthFill } from "react-icons/bs";
import moment from "moment";
import Dropdown from "./Dropdown";

const ChartsHistory = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);
  const [dateRangeOut, setDateRangeOut] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000)));

    return () => clearTimeout(timer);
  }, [currentDate]);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = moment(dateRange[0]).format("YYYY-MM-DD hh:mm:ss A");
      const endDate = moment(dateRange[1]).format("YYYY-MM-DD hh:mm:ss A");
      setDateRangeOut([startDate, endDate]);
    }
  }, [dateRange]);

  const handleOptionChange = (option) => {
    // console.log(option);
    setDataType(option);
  };

  const handleApplyClick = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.16:5000/api/history",
        {
          startDate: dateRangeOut[0],
          endDate: dateRangeOut[1],
        }
      );
      const data = response.data;
      // console.log(data);
      setChartData(formatChartData(data));
    } catch (error) {
      console.error(error);
    }
  };

  const formatChartData = (data) => {
    const formattedData = data.map((item) => ({
      datetime: item.time,
      speed: item[dataType],
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
        name: "Value",
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
        text: dataType,
        left: "center",
      },
    };
  };

  return (
    <div className="charts-container">
      {/* First Row */}
      <div className="row first-row history">
        <div className="section first-row-section ">
          {" "}
          <button id="dashboard-button">History</button>
        </div>
        <div className="section first-row-section history">
          <div>
            <div className="date-picker">
              <DateRangePicker
                format="yyyy/MMM/dd hh:mm:ss aa"
                size="lg"
                appearance="default"
                placeholder="Default"
                style={{ width: 450, marginTop: 8 }}
                value={dateRange}
                onChange={setDateRange}
                showMeridian
                caretAs={FaCalendar}
              />
            </div>
          </div>{" "}
          <div className="section first-row-section history">
            {" "}
            <Dropdown onOptionChange={handleOptionChange} />
          </div>
          <div className="section first-row-section history">
            {" "}
            <button id="apply-button" onClick={handleApplyClick}>
              Apply
            </button>
          </div>
        </div>
        {/* <div className="section second-row-section">
          {chartData && (
            <ReactECharts
              option={chartData}
              style={{ height: "35vh", width: "25vw", minWidth: "420px" }}
            />
          )}
        </div> */}
      </div>
      <div className="row" id="history-chart-row">
        {/* <div className="section huge alert">
          <DateRangePicker
            format="yyyy/MMM/dd hh:mm:ss aa"
            size="lg"
            appearance="default"
            placeholder="Default"
            style={{ width: 230 }}
            value={dateRange}
            onChange={setDateRange}
            showMeridian
            caretAs={FaCalendar}
          />
        </div> */}

        <div className="section second-row-section" id="history-chart">
          {chartData && (
            <ReactECharts
              option={chartData}
              style={{
                height: "60vh",
                width: "90vw",
                minWidth: "420px",
              }}
            />
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ChartsHistory;
