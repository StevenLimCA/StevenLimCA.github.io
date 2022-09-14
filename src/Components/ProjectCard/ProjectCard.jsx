import React from "react";
import "./ProjectCard.scss";
export default function ProjectCard({ project, setActive, projectIndex }) {
  const handleSetActive = (e) => {
    setActive(projectIndex);
  };

  return (
    <div className="project-card" onClick={handleSetActive}>
      <img src={`${project.image}`} alt="" className="project-card__img" />
      <h3 className="project-card__name">{project.name}</h3>
    </div>
  );
}
