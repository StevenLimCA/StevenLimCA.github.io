import React from "react";
import Hero from "../../Hero/Hero";

// import MainContent from "../../MainContent/MainContent";

import ProjectSection from "../../ProjectSection/ProjectSection";
import "./MainPage.scss";

export default function MainPage({ match }) {
  return (
    <div className="main-page">
      <Hero />
      <ProjectSection match={match} />
      {/* <MainContent /> */}
    </div>
  );
}
