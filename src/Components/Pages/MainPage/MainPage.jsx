import React from "react";
import Background from "../../Background/Background";
import Header from "../../Header/Header";
// import MainContent from "../../MainContent/MainContent";
import ProjectSection from "../../ProjectSection/ProjectSection";
import "./MainPage.scss";

export default function MainPage({ match }) {
  return (
    <div className="main-page">
      <Header />
      <Background />
      <ProjectSection match={match} />
      {/* <MainContent /> */}
    </div>
  );
}
