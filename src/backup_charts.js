// React Component for Charts Page
import React from "react";
import "./Charts.css";
import { useState } from "react";
import { useEffect } from "react";
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

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

        </div>
      </div>
      {/* Second Row */}
      <div className="row second-row">
        <div className="section second-row-section">
          <GelcoatSpeedChart />
        </div>
        <div className="section second-row-section" id="ch">
          <BarrierSpeedChart /> 
        </div>
        <div className="section second-row-section">
          <BarrierPulseChart />
        </div>
           
      </div>
      {/* Third Row */}
      <div className="row third-row">
        <div className="section third-row-section">
          <WaterLevel2Chart />
        </div>
        <div className="section third-row-section">
          <PressureChart />
        </div>
        <div className="section third-row-section">
          <GelcoatPulseChart />
        </div>
      </div>
    </div>
  );
};

export default Charts;


// import React, { useState, useEffect } from 'react';


function BarrierSpeedChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(barrierSpeedChart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function barrierSpeedChart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.Barrier_speedRPM
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Speed',
        axisLabel: {
          formatter: '{value}' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'Pump Speed (Barrier)',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}


function GelcoatSpeedChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(gelSpeedChart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function gelSpeedChart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.Gelcoat_speedRPM
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Speed',
        axisLabel: {
          formatter: '{value}' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'Pump Speed (Gelcoat)',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function PressureChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(PressureChart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function PressureChart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.Pressure
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Pressure',
        axisLabel: {
          formatter: '{value} bar' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'Pressure',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}


function WaterLevel2Chart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(waterLevel2Chart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function waterLevel2Chart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.WaterLevel_2
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Level',
        axisLabel: {
          formatter: '{value}' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'WaterLevel',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}



/////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
function BarrierPulseChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(barrierPulseChart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function barrierPulseChart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.Barr_pulses
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Pulses',
        axisLabel: {
          formatter: '{value}' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'Pulses (Barrier)',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}


function GelcoatPulseChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.46:5000/api/get_20');
        console.log(response.data)
        // Format the response data to fit ECharts and update state
        setChartData(gelcoatPulseChart(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData every 1 second
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  // Function to format the fetched data for ECharts
  function gelcoatPulseChart(data) {
    // Combine 'date' and 'time' into a single datetime string and prepare the dataset
    const formattedData = data.map(item => ({
      // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'h:mm:ss a' format
      datetime: item.time,
      speed: item.Gelcoat_pulses
    }));

    // Sort the data by datetime in case it's not already sorted
    formattedData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

    // Split the sorted data into xAxis and series data
    const xAxisData = formattedData.map(item => item.datetime);
    const seriesData = formattedData.map(item => item.speed);

    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: "Time",
        type: 'category',
        data: xAxisData,
        axisLabel: {
          formatter: function (value) {
            // Format the datetime string as needed for display
            return value; // Placeholder, adjust the formatting as needed
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Level',
        axisLabel: {
          formatter: '{value}' // Adjust 'units' to the actual unit of 'speed'
        }
      },
      series: [{
        data: seriesData,
        type: 'line', // Change to 'bar', 'scatter', etc., as needed
        smooth: true // Set to false if you don't want the line to be smoothed
      }],
      
      title: {
        text: 'Pulses (Gelcoat)',
        left: 'center', // Add this line to align the title to the center
      }
        };
  }


  // Render the chart only if data is available
  return chartData ? (
    <ReactECharts option={chartData} style={{ height: '350px' }} />
  ) : (
    <div>Loading chart...</div>
  );
}

