import React from "react";
import "./Background.scss";
import Foreground from "../Foreground/Foreground";
// import TypeAnimation from "react-type-animation";

export default function Background() {
  return (
    <div className="background">
      <div className="sun"></div>
      <div className="cloud"></div> <Foreground />
      {/* <div className="hero__blur"></div> */}
      {/* <h1 className="hero__title">
        <TypeAnimation cursor={true} sequence={["Hi! 🙋🏻‍♂️ I am Steven."]} />
      </h1> */}
    </div>
  );
}
