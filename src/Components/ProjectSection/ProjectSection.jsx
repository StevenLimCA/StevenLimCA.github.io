import React, { useEffect, useRef, useState } from "react";
import Project from "../Project/Project";
import projects from "../../projectsArr/projects.json";
import "./ProjectSection.scss";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function ProjectSection() {
  let [selectedProject, setSelectedProject] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const selectorListRef = useRef(null);

  const updateScrollButtons = () => {
    const selectorList = selectorListRef.current;
    if (!selectorList) return;

    const maxScroll = Math.max(
      selectorList.scrollWidth - selectorList.clientWidth,
      0
    );
    setCanScrollPrevious(selectorList.scrollLeft > 1);
    setCanScrollNext(selectorList.scrollLeft < maxScroll - 1);
  };

  const selectProject = (projectId) => {
    const nextProject = projects.findIndex((project) => project.id === projectId);
    setSelectedProject(nextProject);
  };

  const scrollSelector = (direction) => {
    const selectorList = selectorListRef.current;
    if (!selectorList) return;

    const maxScroll = Math.max(
      selectorList.scrollWidth - selectorList.clientWidth,
      0
    );
    const nextScroll = Math.min(
      Math.max(selectorList.scrollLeft + direction * 170, 0),
      maxScroll
    );

    if (typeof selectorList.scrollTo === "function") {
      selectorList.scrollTo({
        left: nextScroll,
        behavior: "smooth",
      });
    } else {
      selectorList.scrollLeft = nextScroll;
    }
  };

  useEffect(() => {
    const selectorList = selectorListRef.current;
    if (!selectorList) return undefined;

    updateScrollButtons();

    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [selectedProject]);

  return (
    <div className="project-section" id="Projects">
      <h1 className="project-section__title">My Projects </h1>
      <p className="project-section__intro">
        Selected work where websites, integrations, and practical interfaces
        helped real teams or communities get something done.
      </p>
      <div className="project-section__wrap">
        <div className="project-section__wrap--left">
          {<Project key={projects[selectedProject].id} projectObj={projects[selectedProject]} />}
        </div>

        <div className="project-section__card-wrap">
          <h3 className="project-section__subtitle">Choose A Project</h3>
          <div className="project-section__selector-controls">
            <button
              className="project-section__selector-button project-section__selector-button--previous"
              type="button"
              onClick={() => scrollSelector(-1)}
              aria-label="Previous projects"
              disabled={!canScrollPrevious}
            >
              <svg
                className="project-section__selector-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div
              className="project-section__selector-list"
              ref={selectorListRef}
              onScroll={updateScrollButtons}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  isActive={index === selectedProject}
                  project={project}
                  setActive={selectProject}
                  key={project.id}
                />
              ))}
              <div className="project-section__end"></div>
            </div>
            <button
              className="project-section__selector-button project-section__selector-button--next"
              type="button"
              onClick={() => scrollSelector(1)}
              aria-label="Next projects"
              disabled={!canScrollNext}
            >
              <svg
                className="project-section__selector-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
