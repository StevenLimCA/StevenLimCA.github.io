import React from "react";
import "./Project.scss";

export default function Project({ projectArr }) {
  return (
    <div className="projects">
      <div className="projects__wrap">
        <img
          className="projects__image"
          src={`${projectArr.image}`}
          alt={`${projectArr.name}`}
        />
        <div className="projects__wrap--right">
          <h2 className="projects__title">{projectArr.name}</h2>
          <p className="projects__desc">{projectArr.desc}</p>
          <p className="projects__obj">{projectArr.obj1}</p>
          <p className="projects__tech">{projectArr.frontTech}</p>
          <p className="projects__tech">{projectArr.backTech}</p>
        </div>
      </div>
    </div>
  );
}
