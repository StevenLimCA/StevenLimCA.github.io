import React from "react";
import "./AboutSection.scss";
export default function AboutSection() {
  return (
    <div className="about-section" id="About">
      <h1 className="about-section__title">About Me</h1>
      <div className="about-section__content">
        <p className="about-section__text">
          I work at the intersection of websites, operations, and practical
          automation. My background spans React, Node, Express, SQL, WordPress,
          deployment workflows, and the small integration details that help a
          business run with less friction. I like taking scattered tools,
          unclear handoffs, and manual admin work, then shaping them into clear
          screens, reliable forms, and workflows people can actually use.
        </p>
        <h3 className="about-section__subtitle">My Other Passions</h3>
        <div className="about-section__wrap">
          <div className="about-section__icon-wrap mute">
            <img
              className="about-section__icon"
              src="./Icons/music.svg"
              alt="music"
            />
            <p className="about-section__icon-text">Music</p>
          </div>
          <div className="about-section__icon-wrap mute">
            <img
              className="about-section__icon"
              src="./Icons/hiking.svg"
              alt="hiking"
            />
            <p className="about-section__icon-text">Hiking</p>
          </div>{" "}
          <div className="about-section__icon-wrap mute">
            <img
              className="about-section__icon"
              src="./Icons/photography.svg"
              alt="photography"
            />
            <p className="about-section__icon-text">Photography</p>
          </div>
          <div className="about-section__icon-wrap mute">
            <img
              className="about-section__icon"
              src="./Icons/travel.svg"
              alt="Travel"
            />
            <p className="about-section__icon-text">Travel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
