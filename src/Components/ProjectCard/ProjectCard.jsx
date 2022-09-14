import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ project, setActive, projectsArr }) {
  const clickHandler = (e) => {
    setActive(projectsArr.findIndex((el) => el.id === project.id));
  };

  return (
    <div className="project-card" onClick={clickHandler}>
      <img src={`${project.image}`} alt="" className="project-card__img" />
      <h3 className="project-card__name">{project.name}</h3>
    </div>
  );
}
