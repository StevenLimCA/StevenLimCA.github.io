import React from "react";
import "./Project.scss";
import "../TechBadge/TechBadge";
import TechBadge from "../TechBadge/TechBadge";

import { v4 as uuidv4 } from "uuid";

export default function Project({ projectObj }) {
  const clickHandler = (e) => {
    e.preventDefault();
    window.open(`${projectObj.url}`, "_blank");
  };

  return (
    <div className="projects">
      <div className="projects__wrap">
        <img
          className="projects__image grow"
          src={`${projectObj.icon}`}
          alt={`${projectObj.name}`}
          onClick={clickHandler}
        />
        <div className="projects__wrap--right">
          <h2 className="projects__title">{projectObj.name}</h2>
          <p className="projects__desc">{projectObj.desc}</p>
          <p className="projects__obj">{projectObj.obj1}</p>
          <h4 className="projects__subtitle">Front-End Tech Stacks</h4>
          <div className="projects__tech">
            {projectObj.frontTech.map((el) => (
              <TechBadge key={uuidv4()} tech={el} />
            ))}
          </div>
          <h4 className="projects__subtitle">Back-End Tech Stacks</h4>
          <div className="projects__tech">
            {projectObj.backTech.map((el) => (
              <TechBadge key={uuidv4()} tech={el} />
            ))}
          </div>
          <div className="projects__button-wrap">
            <button className="button shrink half">
              <a href={`${projectObj.url}`}>View</a>
            </button>

            {projectObj.gitHubUrl ? (
              <button className="button shrink half">
                <a href={`${projectObj.gitHubUrl}`}>Github</a>{" "}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
