import "./Navbar.scss";
import React from "react";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <div className="navbar__icon--home"></div>
          <a href="/">Home</a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--about"></div>
          <a href="#about">About Me</a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--projects"></div>
          <a href="#projects"> Projects</a>
        </li>
        <li className="navbar__item">
          <div className="navbar__icon--skills"></div>
          <a href="#skills">Skills</a>
        </li>
      </ul>
    </nav>
  );
}
