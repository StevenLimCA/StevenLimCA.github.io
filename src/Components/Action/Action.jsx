import React from "react";

import "./Action.scss";

export default function Action() {
  return (
    <div className="action slide-up">
      <h2 className="action__title">Connect with me</h2>
      <div className="action__wrap">
        <a
          className="action__button grow"
          href="https://www.linkedin.com/in/steven-lim-ca/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="action__icon"
            src="./logos/linkedin.svg"
            alt="LinkedIn"
          />
          LinkedIn
        </a>
        <a
          className="action__button grow"
          href="https://github.com/StevenLimCA"
          target="_blank"
          rel="noreferrer"
        >
          <img className="action__icon" src="./logos/github.svg" alt="Github" />
          GitHub
        </a>
        <a className="action__button grow" href="#Contact">
          <img className="action__icon" src="./logos/email.svg" alt="email" />
          Email
        </a>
      </div>
    </div>
  );
}
