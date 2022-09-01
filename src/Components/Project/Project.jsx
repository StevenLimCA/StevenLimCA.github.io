import React from "react";
import "./Project.scss";

export default function Project(props) {
  return (
    <div className="projects">
      <div className="projects__wrap">
        <img
          className="projects__image"
          src={`${props.projectArr.image}`}
          alt={`${props.projectArr.name}`}
        />
        <div className="projects__wrap--right">
          <h2 className="projects__title">
            {props.projectArr.id}. {props.projectArr.name}
          </h2>
          <p className="projects__desc">{props.projectArr.desc}</p>
          <p className="projects__obj">{props.projectArr.obj1}</p>
          <p className="projects__tech">{props.projectArr.frontTech}</p>
          <p className="projects__tech">{props.projectArr.backTech}</p>
        </div>
      </div>
    </div>
  );
}
