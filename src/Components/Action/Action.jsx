import React from "react";
import "./Action.scss";

export default function Action() {
  const linkedInClick = (e) => {
    window.open(`https://www.linkedin.com/in/steven-lim-ca/`, "_blank");
  };
  return (
    <div className="action">
      <h2 className="action__title">Connect with me today!</h2>
      <div className="action__wrap">
        <div className="action__button grow" onClick={linkedInClick}>
          <img className="action__icon" src="./linkedin.svg" alt="contactme" />
          LinkedIn
        </div>
      </div>
    </div>
  );
}
