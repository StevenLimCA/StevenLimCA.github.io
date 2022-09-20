import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import "./Header.scss";
export default function Header() {
  const [menu, openMenu] = useState(false);
  const handleOnClick = (e) => {
    openMenu((prevState) => !prevState);
  };
  return (
    <>
      <header className="header">
        <div className="header__title rotate360">Steven Lim</div>
        <div className="header--mobile" onClick={handleOnClick}></div>

        {menu && <NavbarMobile />}
        <Navbar />
      </header>
    </>
  );
}
