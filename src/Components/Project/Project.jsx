import React from "react";
import "./Project.scss";
import "../TechBadge/TechBadge";
import TechBadge from "../TechBadge/TechBadge";

export default function Project({ projectObj }) {
  const storyItems = [
    ["Problem", projectObj.problem],
    ["What I Built", projectObj.built],
    ["Result", projectObj.result],
  ];

  return (
    <div className="projects">
      <div className="projects__wrap">
        {projectObj.url ? (
          <a
            className="projects__image-link grow"
            href={projectObj.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${projectObj.name}`}
          >
            <img
              className="projects__image"
              src={`${projectObj.icon}`}
              alt={`${projectObj.name}`}
            />
          </a>
        ) : (
          <div className="projects__image-link">
            <img
              className="projects__image"
              src={`${projectObj.icon}`}
              alt={`${projectObj.name}`}
            />
          </div>
        )}
        <div className="projects__wrap--right">
          <p className="projects__eyebrow">{projectObj.role}</p>
          <h2 className="projects__title">{projectObj.name}</h2>
          <p className="projects__desc">{projectObj.desc}</p>
          <div className="projects__story">
            {storyItems.map(([label, text]) => (
              <section className="projects__story-item" key={label}>
                <h3 className="projects__story-title">{label}</h3>
                <p className="projects__story-text">{text}</p>
              </section>
            ))}
          </div>
          <div className="projects__meta">
            <p className="projects__meta-item">
              <strong>Focus</strong>
              {projectObj.impact}
            </p>
          </div>
          <div className="projects__stack-wrap">
            <div>
              <h4 className="projects__subtitle">Front-End</h4>
              <div className="projects__tech">
                {projectObj.frontTech.map((el) => (
                  <TechBadge key={el} tech={el} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="projects__subtitle">Back-End</h4>
              <div className="projects__tech">
                {projectObj.backTech.map((el) => (
                  <TechBadge key={el} tech={el} />
                ))}
              </div>
            </div>
          </div>
          {(projectObj.url || projectObj.gitHubUrl) && (
            <div className="projects__button-wrap">
              {projectObj.url && (
                <a
                  className="button grow half projects__link"
                  href={`${projectObj.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              )}

              {projectObj.gitHubUrl && (
                <a
                  className="button grow half projects__link"
                  href={`${projectObj.gitHubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
