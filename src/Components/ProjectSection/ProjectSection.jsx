import React, { useState } from "react";
import Project from "../Project/Project";
import projects from "../../projectsArr/projects.json";
import "./ProjectSection.scss";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function ProjectSection() {
  let [selectedProject, setSelectedProject] = useState(0);
  const selectProject = (projectId) => {
    const nextProject = projects.findIndex((project) => project.id === projectId);
    setSelectedProject(nextProject);
  };

  return (
    <div className="project-section" id="Projects">
      <h1 className="project-section__title">My Projects </h1>
      <p className="project-section__intro">
        Selected work where websites, integrations, and practical interfaces
        helped real teams or communities get something done.
      </p>
      <div className="project-section__wrap">
        <div className="project-section__wrap--left">
          {<Project projectObj={projects[selectedProject]} />}
        </div>

        <div className="project-section__card-wrap">
          <h3 className="project-section__subtitle">Choose A Project</h3>
          <div className="project-section__selector-list">
            {projects
              .filter((el) => el.id !== projects[selectedProject].id)
              .map((project) => (
                <ProjectCard
                  project={project}
                  setActive={selectProject}
                  key={project.id}
                />
              ))}
            <div className="project-section__end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
