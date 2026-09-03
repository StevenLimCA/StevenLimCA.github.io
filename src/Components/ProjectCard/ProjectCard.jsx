import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ isActive, project, setActive }) {
  const clickHandler = () => {
    setActive(project.id);
  };

  return (
    <button
      className={`project-card${isActive ? " project-card--active" : ""}`}
      type="button"
      onClick={clickHandler}
      aria-pressed={isActive}
      aria-label={project.name}
    >
      <img
        src={`${project.icon}`}
        alt=""
        className="project-card__img"
      />
      <div className="project-card__text-wrap">
        <p className="project-card__name">{project.name}</p>
        <p className="project-card__role">{project.role}</p>
        <p className="project-card__desc">{project.problem}</p>
      </div>
    </button>
  );
}
