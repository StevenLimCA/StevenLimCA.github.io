import "./Navbar.scss";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <div className="navbar__icon--home"></div>
          Home
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--project"></div>Projects
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--photos"></div>Photography
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--connect"></div>Connect
        </li>
      </ul>
    </nav>
  );
}
