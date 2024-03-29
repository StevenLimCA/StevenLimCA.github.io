import React from "react";

import "./Action.scss";

export default function Action() {
  const linkedInClick = (e) => {
    window.open(`https://www.linkedin.com/in/steven-lim-ca/`, "_blank");
  };
  const gitHubClick = (e) => {
    window.open(`https://github.com/StevenLimCA`, "_blank");
  };
  const emailClick = (e) => {
    window.location.href = "#Contact";
  };
  return (
    <div className="action slide-up">
      <h2 className="action__title">Connect with me today!</h2>
      <div className="action__wrap">
        <div className="action__button grow" onClick={linkedInClick}>
          <img
            className="action__icon"
            src="./logos/linkedin.svg"
            alt="LinkedIn"
          />
          LinkedIn
        </div>
        <div className="action__button grow" onClick={gitHubClick}>
          <img className="action__icon" src="./logos/github.svg" alt="Github" />
          GitHub
        </div>
        <div className="action__button grow" onClick={emailClick}>
          <img className="action__icon" src="./logos/email.svg" alt="email" />
          Email
        </div>
      </div>
    </div>
  );
}
