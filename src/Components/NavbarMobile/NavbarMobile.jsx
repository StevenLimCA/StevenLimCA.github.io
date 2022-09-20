import React from "react";
import "./NavbarMobile.scss";
export default function NavbarMobile() {
  return (
    <nav className="navbar-mobile">
      <ul className="navbar-mobile__list">
        <li className="navbar-mobile__item">
          <div className="navbar-mobile__icon--home"></div>
          <a className="navbar-mobile__link" href="/">
            Home
          </a>
        </li>
        <li className="navbar-mobile__item">
          <div className="navbar-mobile__icon--about"></div>
          <a href="#about">About Me</a>
        </li>
        <li className="navbar-mobile__item">
          <div className="navbar-mobile__icon--projects"></div>
          <a href="#projects"> Projects</a>
        </li>
        <li className="navbar__item-mobile">
          <div className="navbar-mobile__icon--skills"></div>
          <a href="#skills">Skills</a>
        </li>
      </ul>
    </nav>
  );
}
