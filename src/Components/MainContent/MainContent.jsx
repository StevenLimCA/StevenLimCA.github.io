import React from "react";
import ProjectPage from "../Pages/ProjectPage/ProjectPage";
import "./MainContent.scss";

export default function MainContent() {
  return (
    <main className="main-content">
      <p className="main-content__text">Hi! I am a full-stack web developer.</p>{" "}
      {/* <p className="main-content__text">
        Whether you need a website to communicate value or a web application to
        create value for your clients, I am up for the task every step.
      </p>
      <p className="main-content__text">
        Together, we can reduce paper waste, captivate your audience, generate
        leads, and provide goods & services conveniently and efficiently to your
        clients.
      </p> */}
      <ProjectPage />
    </main>
  );
}
