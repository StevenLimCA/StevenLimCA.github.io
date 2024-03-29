import React from "react";
import "./SkillSection.scss";

export default function SkillsSection() {
  return (
    <div className="skills" id="Skills">
      <div className="skills__background">
        <div className="skills__background--area">
          <ul className="skills__background--circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="skills__content">
            <h1 className="skills__title">My Tech Stacks</h1>
            <div className="skills__icons-wrapper">
              <img
                className="skills__icon mute"
                alt="HTML"
                src="./logos/HTML5.svg"
              />
              <img
                className="skills__icon mute"
                alt="CSS3"
                src="./logos/CSS3.svg"
              />{" "}
              <img
                className="skills__icon mute"
                alt="Javascript"
                src="./logos/JavaScript.svg"
              />{" "}
            </div>
            <div className="skills__icons-wrapper">
              <div className="skills__icons-text-wrap mute">
                <img
                  className="skills__icon"
                  alt="React"
                  src="./logos/React.svg"
                />
                ReactJS
              </div>
              <div className="skills__icons-text-wrap mute">
                <img
                  className="skills__icon"
                  alt="Node JS"
                  src="./logos/node-js.svg"
                />
                NodeJS
              </div>

              <div className="skills__icons-text-wrap mute">
                <img
                  className="skills__icon"
                  alt="ExpressJS"
                  src="./logos/expressjs.svg"
                />
                expressJS
              </div>
            </div>
            <div className="skills__icons-wrapper">
              <div className="skills__icons-text-wrap mute">
                <img
                  className="skills__icon"
                  alt="mysql"
                  src="./logos/mysql.svg"
                />
                MySQL
              </div>
              <div className="skills__icons-wrapper">
                <div className="skills__icons-text-wrap">
                  <img
                    className="skills__icon mute"
                    alt="Sass"
                    src="./logos/sass.svg"
                  />
                  Sass
                </div>
              </div>{" "}
              <div className="skills__icons-wrapper">
                <div className="skills__icons-text-wrap">
                  <img
                    className="skills__icon mute"
                    alt="Git"
                    src="./logos/git.svg"
                  />{" "}
                  Git
                </div>
              </div>
            </div>{" "}
            <div className="skills__icons-wrapper">
              <div className="skills__icons-text-wrap">
                <img
                  className="skills__icon mute"
                  alt="bash"
                  src="./logos/Bash.svg"
                />
                Bash
              </div>{" "}
              <div className="skills__icons-wrapper">
                <div className="skills__icons-text-wrap">
                  <img
                    className="skills__icon mute"
                    alt="powershell"
                    src="./logos/PowerShell.svg"
                  />
                  PowerShell
                </div>
              </div>
              <div className="skills__icons-wrapper">
                <div className="skills__icons-text-wrap">
                  <img
                    className="skills__icon mute"
                    alt="powershell"
                    src="./logos/jira.svg"
                  />
                  Jira
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
