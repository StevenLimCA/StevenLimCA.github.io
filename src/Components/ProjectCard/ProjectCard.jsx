import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ project, setActive }) {
  const clickHandler = (e) => {
    setActive(project.id);
    document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button className="project-card shrink" type="button" onClick={clickHandler}>
      <img
        src={`${project.icon}`}
        alt={project.name}
        className="project-card__img"
      />
      <div className="project-card__text-wrap">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__role">{project.role}</p>
        <p className="project-card__desc">{project.problem}</p>
      </div>
    </button>
  );
}
