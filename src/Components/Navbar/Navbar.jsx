import "./Navbar.scss";
import React from "react";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <div className="navbar__icon--home"></div>
          <a href="/" className="navbar__link">
            Home
          </a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--about"></div>
          <a href="#About" className="navbar__link">
            About Me
          </a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--projects"></div>
          <a href="#Projects" className="navbar__link">
            Projects
          </a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--skills"></div>
          <a href="#Skills" className="navbar__link">
            Skills
          </a>
        </li>
      </ul>
    </nav>
  );
}
