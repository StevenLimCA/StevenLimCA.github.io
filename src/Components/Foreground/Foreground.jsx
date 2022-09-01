import React from "react";
import ProjectPage from "../Pages/ProjectPage/ProjectPage";
import "./Foreground.scss";
export default function Foreground({ pageTitle, setTitle }) {
  return (
    <div className="foreground">
      <ProjectPage pageTitle={pageTitle} setTitle={setTitle} />
    </div>
  );
}
