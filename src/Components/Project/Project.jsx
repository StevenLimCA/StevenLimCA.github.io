import React from "react";
import "./Project.scss";

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
          <p className="projects__tech">{projectObj.frontTech}</p>
          <p className="projects__tech">{projectObj.backTech}</p>{" "}
          <button className="button grow" onClick={clickHandler}>
            View Now!
          </button>
        </div>
      </div>
    </div>
  );
}
