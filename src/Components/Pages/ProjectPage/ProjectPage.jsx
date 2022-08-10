import React from "react";
import Project from "../../Project/Project";
import projects from "../../../projects/projects.json";
import "./ProjectPage.scss";
import uuid from "react-uuid";

export default function ProjectPage() {
  return (
    <>
      {projects.map((project) => (
        <Project key={uuid()} projectArr={project} />
      ))}
    </>
  );
}
