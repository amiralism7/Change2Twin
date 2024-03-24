import React from "react";
import "./Settings.css";
import { useState } from "react";
import { useEffect } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    language: "English",
    timezone: "GMT",
    darkMode: false,
    emailNotifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
    console.log(settings);
  };
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
          <button id="dashboard-button">Settings</button>
        </div>
        <div className="section first-row-section">
          {" "}
          <p id="current-date-charts">
            {" "}
            Date: {currentDate.toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="settings-page">
        <p id="customize">Customize your dashboard and account settings</p>
        <form onSubmit={handleSubmit}>
          <label>
            Account Email
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Enter your email"
              id="blank-box"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              placeholder="Enter new password"
              id="blank-box"
            />
          </label>
          <label>
            Language
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              id="select-box"
            >
              {/* Add more options as needed */}
              <option value="English">English</option>
              <option value="German">German</option>
            </select>
          </label>
          <label>
            Timezone
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              id="select-box"
            >
              {/* Add more options as needed */}
              <option value="GMT">GMT</option>
              <option value="CET">CET</option>
            </select>
          </label>
          <label>
            Enable Dark Mode
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              id="check-box"
            />
          </label>
          <label>
            Receive Email Notifications
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              id="check-box"
            />
          </label>
          <div className="buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;