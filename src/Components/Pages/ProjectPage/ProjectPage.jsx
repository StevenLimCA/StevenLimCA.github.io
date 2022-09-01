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
      console.log(count);
    } else {
      setCount(count++);
    }
  };
  const prevProject = (e) => {
    if (count >= -1) {
      setCount(0);
    } else {
      setCount(count--);
    }
  };
  const clickhandler = (e) => {
    e.preventDefault();
    window.open(`${projects[count].url}`, "_blank");
  };
  return (
    <div className="project-section">
      {<Project projectArr={projects[count]} />}
      <div className="project-section__nav-wrap">
        <button className="project-section__nav" onClick={prevProject}>
          &#60;
        </button>
        <button
          className="project-section__call-to-action"
          onClick={clickhandler}
        >
          View Now!
        </button>
        <button className="project-section__nav" onClick={nextProject}>
          &#62;{" "}
        </button>
      </div>
      {/* {projects.map((project) => (
        <Project key={uuid()} projectArr={project} />
      ))} */}
    </div>
  );
}
