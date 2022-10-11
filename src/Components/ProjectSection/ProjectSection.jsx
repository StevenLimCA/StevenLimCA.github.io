import React, { useState } from "react";
import Project from "../Project/Project";
import projects from "../../projectsArr/projects.json";
import "./ProjectSection.scss";
import ProjectCard from "../ProjectCard/ProjectCard";
import { v4 as uuidv4 } from "uuid";

export default function ProjectSection() {
  let [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="project-section" id="Projects">
      <h1 className="project-section__title">My Projects </h1>
      <div className="project-section__wrap">
        <div className="project-section__wrap--left">
          {<Project projectObj={projects[selectedProject]} />}
        </div>

        <div className="project-section__card-wrap">
          <h3 className="project-section__subtitle">Choose A Project</h3>
          {projects
            .filter((el) => el.id !== projects[selectedProject].id)
            .map((project) => (
              <ProjectCard
                projectsArr={projects}
                project={project}
                setActive={setSelectedProject}
                key={uuidv4()}
              />
            ))}
          <div className="project-section__end"></div>
        </div>
      </div>
    </div>
  );
}
