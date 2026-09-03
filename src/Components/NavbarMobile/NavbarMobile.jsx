import React from "react";
import "./NavbarMobile.scss";

const navItems = [
  { id: "home", label: "Home", iconClass: "navbar-mobile__icon--home" },
  { id: "About", label: "About Me", iconClass: "navbar-mobile__icon--about" },
  {
    id: "Projects",
    label: "Projects",
    iconClass: "navbar-mobile__icon--projects",
  },
  {
    id: "Skills",
    label: "Capabilities",
    iconClass: "navbar-mobile__icon--skills",
  },
  {
    id: "Contact",
    label: "Contact Me",
    iconClass: "navbar-mobile__icon--contact",
  },
];

export default function NavbarMobile({ activeSection, setMenu }) {
  const closeMenu = () => {
    setMenu((prevState) => !prevState);
  };
  const handleClose = (e) => {
    closeMenu();
  };
  const handleClick = (sectionId) => {
    window.location.href = `#${sectionId}`;
    closeMenu();
  };

  return (
    <nav className="navbar-mobile">
      <div className="navbar-mobile__wrap slide-up">
        <div className="navbar-mobile__close mute" onClick={handleClose}></div>
        <h3 className="navbar-mobile__title">Steven Lim</h3>
        <ul className="navbar-mobile__list">
          {navItems.map((item) => (
            <li
              className={`navbar-mobile__item${
                activeSection === item.id ? " navbar-mobile__item--active" : ""
              }`}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <div className={item.iconClass}></div>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
