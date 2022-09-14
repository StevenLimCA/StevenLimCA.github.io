import React, { useState } from "react";
import Project from "../../Project/Project";
import projects from "../../../projectsArr/projects.json";
import "./ProjectPage.scss";
import ProjectCard from "../../ProjectCard/ProjectCard";
import uuid from "react-uuid";

export default function ProjectPage() {
  let [selected, setSelected] = useState(0);

  const clickhandler = (e) => {
    e.preventDefault();
    window.open(`${projects[selected].url}`, "_blank");
  };

  const otherProjects = projects.map((el) => el);

  console.log(otherProjects);
  return (
    <div className="project-section">
      <h1>My Projects</h1>
      <div className="project-section__wrap--left">
        {<Project projectArr={projects[selected]} />}
        <div className="project-section__nav-wrap">
          <button
            className="project-section__call-to-action"
            onClick={clickhandler}
          >
            View Now!
          </button>
        </div>
      </div>
      <div className="project-section__side">
        <h1>List of Projects:</h1>
        {projects.map((project, i) => (
          <ProjectCard
            project={project}
            projectIndex={i}
            setActive={setSelected}
            key={uuid()}
          />
        ))}
      </div>
    </div>
  );
}
