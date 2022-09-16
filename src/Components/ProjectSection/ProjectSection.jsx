import React, { useState } from "react";
import Project from "../Project/Project";
import projects from "../../projectsArr/projects.json";
import "./ProjectSection.scss";
import ProjectCard from "../ProjectCard/ProjectCard";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
export default function ProjectSection() {
  let [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="project-section">
      <Link name="projects-section" to=""></Link>
      <h1>My Projects</h1>
      <div className="project-section__wrap">
        <div className="project-section__wrap--left">
          {<Project projectObj={projects[selectedProject]} />}
        </div>

        <div className="project-section__card-wrap">
          {projects
            .filter((el) => el.id !== projects[selectedProject].id)
            .map((project) => (
              <ProjectCard
                projectsArr={projects}
                project={project}
                setActive={setSelectedProject}
                key={uuid()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
