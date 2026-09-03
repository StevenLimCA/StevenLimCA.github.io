import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import "./Header.scss";
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [bgColor, setBGColor] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const changeColor = () => {
    if (window.scrollY <= 240) {
      setBGColor(true);
    } else {
      setBGColor(false);
    }
  };

  const updateActiveSection = () => {
    const sections = ["home", "About", "Projects", "Skills", "Contact"];
    const focusPoint = window.scrollY + window.innerHeight * 0.38;
    let currentSection = sections[0];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section && section.offsetTop <= focusPoint) {
        currentSection = sectionId;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    changeColor();
    updateActiveSection();
    window.addEventListener("scroll", changeColor);
    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", changeColor);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);
  const handleOnClick = (e) => {
    setMenu((prevState) => !prevState);
  };
  return (
    <>
      <header className={bgColor ? "header header-bg" : "header"}>
        <div className="header__title rotate360">Steven Lim</div>
        <div className="header--mobile grow" onClick={handleOnClick}></div>
        {menu && (
          <NavbarMobile activeSection={activeSection} setMenu={setMenu} />
        )}
        <Navbar activeSection={activeSection} />
      </header>
    </>
  );
}
