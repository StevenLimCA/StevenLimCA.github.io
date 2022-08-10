import React from "react";
import "./Projects.scss";
export default function Project(props) {
  return (
    <div className="projects">
      <h1 className="projects__header">My Projects</h1>
      <div className="projects__wrap">
        <img
          className="projects__image"
          src={`${props.projectArr.image}`}
          alt={`${props.projectArr.name}`}
        />
        <div className="projects__wrap--right">
          <h2 className="projects__title">
            {props.projectArr.id}. {props.projectArr.name}
          </h2>
          <p className="projects__desc">{props.projectArr.desc}</p>
          <p className="project__tech">{props.projectArr.frontTech}</p>
          <p className="project__tech">{props.projectArr.backTech}</p>
        </div>
      </div>
    </div>
  );
}
