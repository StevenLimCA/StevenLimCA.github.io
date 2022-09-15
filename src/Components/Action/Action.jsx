import React from "react";
import "./Action.scss";

export default function Action() {
  const linkedInClick = (e) => {
    window.open(`https://www.linkedin.com/in/steven-lim-ca/`, "_blank");
  };
  return (
    <div className="action">
      <h2 className="action__title">Lets Connect</h2>
      <div className="action__wrap">
        <div className="action__button" onClick={linkedInClick}>
          <img className="action__icon" src="./linkedin.svg" alt="contactme" />
          LinkedIn
        </div>
      </div>
    </div>
  );
}
