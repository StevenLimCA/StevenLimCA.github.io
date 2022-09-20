import React from "react";
import "./NavbarMobile.scss";
export default function NavbarMobile({ setMenu }) {
  const closeMenu = () => {
    setMenu((prevState) => !prevState);
  };
  const handleClose = (e) => {
    closeMenu();
  };
  const handleClick = (e) => {
    window.location.href = "#" + e.target.classList[1];
    closeMenu();
  };
  return (
    <nav className="navbar-mobile">
      <div className="navbar-mobile__wrap">
        <div className="navbar-mobile__close" onClick={handleClose}></div>
        <h3 className="navbar-mobile__title">Menu</h3>
        <ul className="navbar-mobile__list">
          <li className="navbar-mobile__item home" onClick={handleClick}>
            <div className="navbar-mobile__icon--home"></div>
            Home
          </li>
          <li className="navbar-mobile__item about" onClick={handleClick}>
            <div className="navbar-mobile__icon--about"></div>
            About
          </li>
          <li className="navbar-mobile__item project " onClick={handleClick}>
            <div className="navbar-mobile__icon--projects "></div>
            Project
          </li>
          <li className="navbar-mobile__item skills" onClick={handleClick}>
            <div className="navbar-mobile__icon--skills"></div>
            Skills
          </li>
        </ul>
      </div>
    </nav>
  );
}