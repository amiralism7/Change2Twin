// Header.js
import React from "react";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="images/red_chart.PNG"
          alt="Change2Twin Logo"
          className="logo-change2twin"
        />
        <img
          src="images/logo.PNG"
          alt="Trygons Logo"
          className="logo-trygons"
        />
        <img src="svg/search.svg" alt="search" className="svg" />
        <img src="svg/bell.svg" alt="notification" className="svg" />
        <img src="svg/person-circle.svg" alt="admin" className="svg" />
        <img
          src="svg/chevron-down.svg"
          alt="drop-dpwn"
          className="svg"
          id="drop-down"
        />
      </div>
    </header>
  );
}
export default Header;
