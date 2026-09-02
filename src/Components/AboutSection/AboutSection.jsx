import React from "react";
import "./AboutSection.scss";
export default function AboutSection() {
  return (
    <div className="about-section" id="About">
      <h1 className="about-section__title">About Me</h1>
      <div className="about-section__content">
        <p className="about-section__text">
          I enjoy building web applications that make everyday work easier. My
          background spans React, Node, Express, SQL, deployment workflows, and
          the little details that make an interface feel calm and useful. I like
          turning messy problems into clear screens, helpful automation, and
          tools people can actually use.
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
