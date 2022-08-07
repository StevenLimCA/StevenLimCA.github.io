import React from "react";
import "./ProjectPage.scss";
import projects from "../../../projects/projects.json";
export default function ProjectPage() {
  return (
    <div className="projects">
      <h1 className="projects__header">My Projects</h1>{" "}
      <h2 className="projects__title">{projects[0].name}</h2>
      <img
        className="projects__image"
        src={`data:image/png;base64,${projects[0].image}`}
        alt={`${projects[0].name}`}
      />
    </div>
  );
}
