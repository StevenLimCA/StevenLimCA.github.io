import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ project, setActive, projectsArr }) {
  const clickHandler = (e) => {
    setActive(projectsArr.findIndex((el) => el.id === project.id));
    window.location.href = "#projects-section";
  };

  return (
    <div className="project-card grow" onClick={clickHandler}>
      <img
        src={`${project.image}`}
        alt={project.name}
        className="project-card__img"
      />
      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__desc">{project.desc.substring(0, 150)}</p>
    </div>
  );
}
