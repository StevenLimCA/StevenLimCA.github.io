import React from "react";

import "./Header.scss";
export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header__title">Steven Lim</div>
        <img
          className="header__html-css-icon"
          alt="HTML and CSS"
          src="/logos/CSS3HTML5.svg"
        />
        <div className="header__icon-wrapper">
          <img
            className="header__js-icon"
            alt="Javascript"
            src="/logos/JavaScript.svg"
          />
          {/* <img className="header__icon" alt="React" src="/logos/React.svg" />
          <img
            className="header__icon"
            alt="Node JS"
            src="/logos/node-js.svg"
          /> */}
        </div>
        {/* <Navbar /> */}
      </header>
    </>
  );
}
