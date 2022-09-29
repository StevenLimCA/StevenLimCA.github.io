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
      <div className="navbar-mobile__wrap slide-up">
        <div className="navbar-mobile__close mute" onClick={handleClose}></div>
        <h3 className="navbar-mobile__title">Steven Lim</h3>
        <ul className="navbar-mobile__list">
          <li className="navbar-mobile__item home grow" onClick={handleClick}>
            <div className="navbar-mobile__icon--home"></div>
            Home
          </li>
          <li className="navbar-mobile__item About grow" onClick={handleClick}>
            <div className="navbar-mobile__icon--about"></div>
            About Me
          </li>
          <li
            className="navbar-mobile__item Projects grow"
            onClick={handleClick}
          >
            <div className="navbar-mobile__icon--projects "></div>
            Projects
          </li>
          <li className="navbar-mobile__item Skills grow" onClick={handleClick}>
            <div className="navbar-mobile__icon--skills"></div>
            Skills
          </li>
          <li
            className="navbar-mobile__item Contact grow"
            onClick={handleClick}
          >
            <div className="navbar-mobile__icon--contact"></div>
            Contact Me
          </li>
        </ul>
      </div>
    </nav>
  );
}
