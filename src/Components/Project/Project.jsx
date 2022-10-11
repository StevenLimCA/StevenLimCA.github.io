import React from "react";
import "./Project.scss";
import "../TechBadge/TechBadge";
import TechBadge from "../TechBadge/TechBadge";
import uuid from "react-uuid";
export default function Project({ projectObj }) {
  const clickHandler = (e) => {
    e.preventDefault();
    window.open(`${projectObj.url}`, "_blank");
  };
  console.log(projectObj.backTech);
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
          <p className="projects__tech">
            {projectObj.frontTech.map((el) => (
              <TechBadge key={uuid} tech={el} />
            ))}
          </p>
          <h4 className="projects__subtitle">Back-End Tech Stacks</h4>
          <p className="projects__tech">
            {projectObj.backTech.map((el) => (
              <TechBadge key={uuid} tech={el} />
            ))}
          </p>
          <button className="button shrink" onClick={clickHandler}>
            View Now!
          </button>
        </div>
      </div>
    </div>
  );
}
