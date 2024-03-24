// App.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./App.css";
import HomePage from "./HomePage"; // Import the HomePage component
import Dashboard from "./Dashboard"; // Import the HomePage component
import Charts from "./Charts";
import Maintenance from "./Maintenance";
import Alerts from "./Alerts";
import Settings from "./Settings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route exact path="/Home" element={<HomePage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Charts" element={<Charts />} />
              <Route path="/Maintenance" element={<Maintenance />} />
              <Route path="/Alerts" element={<Alerts />} />
              <Route path="/Settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
