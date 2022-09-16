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
    window.open(`mailto:s.lim@live.ca`, "_blank");
  };
  return (
    <div className="action">
      <h2 className="action__title">Connect with me today!</h2>
      <div className="action__wrap">
        <div className="action__button grow" onClick={linkedInClick}>
          <img className="action__icon" src="./linkedin.svg" alt="LinkedIn" />
          LinkedIn
        </div>
        <div className="action__button grow" onClick={gitHubClick}>
          <img className="action__icon" src="./github.svg" alt="Github" />
          GitHub
        </div>
        <div className="action__button grow" onClick={emailClick}>
          <img className="action__icon" src="./email.svg" alt="email" />
          Email
        </div>
      </div>
    </div>
  );
}
