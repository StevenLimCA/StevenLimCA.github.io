import React from "react";
import "./AboutSection.scss";
export default function AboutSection() {
  return (
    <div className="about-section">
      <h1 className="about-section__title">About Me</h1>
      <div className="about-section__content">
        <p className="about-section__text">
          I love web development because it enables me to communicate with my
          computer at a deeper level, so I can automate mundane tasks, create
          simplified workflows, build games and more! Furthermore, it challenges
          me everyday and keeps my mind fresh.
        </p>
        {/* <h3 className="about-section__subtitle">Other Passions</h3> */}
      </div>
    </div>
  );
}
