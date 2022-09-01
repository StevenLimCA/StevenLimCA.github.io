import React, { useState } from "react";
import Project from "../../Project/Project";
import projects from "../../../projectsArr/projects.json";
import "./ProjectPage.scss";
// import uuid from "react-uuid";

export default function ProjectPage() {
  let [count, setCount] = useState(0);
  const nextProject = (e) => {
    if (count === projects.length) {
      setCount(projects.length - 1);
    } else {
      setCount(count++);
    }
  };
  const prevProject = (e) => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count--);
    }
  };

  return (
    <div className="project-section">
      <h1 className="project-section__header">My Projects</h1>
      {<Project projectArr={projects[count]} />}
      <div className="project-section__nav-wrap">
        <button className="project-section__nav" onClick={prevProject}>
          ⬅
        </button>{" "}
        <button className="project-section__nav" onClick={nextProject}>
          ➡
        </button>
      </div>
      {/* {projects.map((project) => (
        <Project key={uuid()} projectArr={project} />
      ))} */}
    </div>
  );
}
