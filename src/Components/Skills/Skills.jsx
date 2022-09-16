import React from "react";
import "./Skills.scss";
export default function Skills() {
  return (
    <div className="skills">
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
          </ul>
          <div className="skills__content">
            <h1 className="skills__title">My Tech Stacks</h1>
            <div className="skills__icons-wrapper">
              <img
                className="skills__icon grow"
                alt="HTML"
                src="./logos/HTML5.svg"
              />
              <img
                className="skills__icon grow"
                alt="CSS3"
                src="./logos/CSS3.svg"
              />{" "}
              <img
                className="skills__icon grow"
                alt="Javascript"
                src="./logos/JavaScript.svg"
              />{" "}
            </div>
            <div className="skills__icons-wrapper">
              <div className="skills__icons-text-wrap grow">
                <img
                  className="skills__icon"
                  alt="React"
                  src="./logos/React.svg"
                />
                ReactJS
              </div>
              <div className="skills__icons-text-wrap grow">
                <img
                  className="skills__icon"
                  alt="Node JS"
                  src="./logos/node-js.svg"
                />
                NodeJS
              </div>

              <div className="skills__icons-text-wrap grow">
                <img
                  className="skills__icon"
                  alt="ExpressJS"
                  src="./logos/expressjs.svg"
                />
                expressJS
              </div>
            </div>
            <div className="skills__icons-wrapper">
              <div className="skills__icons-text-wrap grow">
                <img
                  className="skills__icon"
                  alt="mysql"
                  src="./logos/mysql.svg"
                />
              </div>
              <div className="skills__icons-text-wrap">
                <img
                  className="skills__icon grow"
                  alt="Node JS"
                  src="./logos/sass.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
