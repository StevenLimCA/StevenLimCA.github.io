import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";
export default function Header() {
  return (
    <>
      <header className="header">
        <div className="main-logo">Steven Lim</div>
        <Navbar />
      </header>
    </>
  );
}
