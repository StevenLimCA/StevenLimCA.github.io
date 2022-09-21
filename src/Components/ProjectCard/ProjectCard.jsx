import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ project, setActive, projectsArr }) {
  const clickHandler = (e) => {
    setActive(projectsArr.findIndex((el) => el.id === project.id));
    window.location.href = "#projects";
  };

  return (
    <div className="project-card shrink" onClick={clickHandler}>
      <img
        src={`${project.icon}`}
        alt={project.name}
        className="project-card__img"
      />
      <div className="project-card__text-wrap">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__desc">{project.desc.substring(0, 80)}...</p>
      </div>
    </div>
  );
}
