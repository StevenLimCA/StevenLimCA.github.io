import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import "./Header.scss";
export default function Header() {
  const [menu, setMenu] = useState(false);
  const handleOnClick = (e) => {
    setMenu((prevState) => !prevState);
  };
  return (
    <>
      <header className="header">
        <div className="header__title rotate360">Steven Lim</div>
        <div className="header--mobile grow" onClick={handleOnClick}></div>
        {menu && <NavbarMobile setMenu={setMenu} />}
        <Navbar />
      </header>
    </>
  );
}
