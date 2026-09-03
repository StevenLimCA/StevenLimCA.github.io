import "./Navbar.scss";
import React from "react";

const navItems = [
  { id: "home", label: "Home", iconClass: "navbar__icon--home" },
  { id: "About", label: "About Me", iconClass: "navbar__icon--about" },
  { id: "Projects", label: "Projects", iconClass: "navbar__icon--projects" },
  { id: "Skills", label: "Capabilities", iconClass: "navbar__icon--skills" },
  { id: "Contact", label: "Contact Me", iconClass: "navbar__icon--contact" },
];

export default function Navbar({ activeSection }) {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {navItems.map((item) => (
          <li
            className={`navbar__item${
              activeSection === item.id ? " navbar__item--active" : ""
            }`}
            key={item.id}
          >
            <div className={item.iconClass}></div>
            <a href={`#${item.id}`} className="navbar__link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
