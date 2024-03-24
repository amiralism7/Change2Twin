// Sidebar.js
import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <img src="svg/house-door-fill.svg" alt="home" />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <img src="svg/speedometer2.svg" alt="home" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Charts"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <img src="svg/bar-chart-line.svg" alt="home" />
            Charts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Maintenance"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <img src="svg/suitcase-lg.svg" alt="home" />
            Maintenance
          </NavLink>
        </li>

        <li>
          <img src="svg/calendar2-date.svg" alt="home" />
          Calendar
        </li>

        <li>
          <NavLink
            to="/Alerts"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <img src="svg/bell.svg" alt="home" />
            Alerts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Settings"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {" "}
            <img src="svg/gear.svg" alt="home" />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
