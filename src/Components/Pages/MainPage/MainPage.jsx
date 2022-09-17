import React from "react";
import Hero from "../../Hero/Hero";
import ProjectSection from "../../ProjectSection/ProjectSection";
import Skills from "../../Skills/Skills";
import "./MainPage.scss";

export default function MainPage() {
  return (
    <div className="main-page">
      <Hero />
      <ProjectSection />
      <Skills />
    </div>
  );
}
