import React, { useState } from "react";
import Project from "../../Project/Project";
import projects from "../../../projectsArr/projects.json";
import "./ProjectPage.scss";
import ProjectCard from "../../ProjectCard/ProjectCard";
import uuid from "react-uuid";

export default function ProjectPage() {
  let [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="project-section">
      <h1>Check out my Projects:</h1>
      <div className="project-section__wrap--left">
        {<Project projectObj={projects[selectedProject]} />}
      </div>
      <div className="project-section__side">
        <h1>Other Projects:</h1>
        <div className="project-section__wrap">
          {projects
            .filter((el) => el !== projects[selectedProject])
            .map((project, i) => (
              <ProjectCard
                project={project}
                projectIndex={i}
                setActive={setSelectedProject}
                key={uuid()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
