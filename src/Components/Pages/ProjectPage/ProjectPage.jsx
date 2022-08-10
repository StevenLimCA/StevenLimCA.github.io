import React from "react";
import Project from "../../Project/Project";
import projects from "../../../projectsArr/projects.json";
import "./ProjectPage.scss";
import uuid from "react-uuid";

export default function ProjectPage() {
  return (
    <div className="project-section">
      <h1 className="projects-section__header">My Projects</h1>
      {projects.map((project) => (
        <Project key={uuid()} projectArr={project} />
      ))}
    </div>
  );
}
