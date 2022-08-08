import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero() {
  return (
    <div className="hero">
      {" "}
      <div className="sun"></div>
      <div className="cloud"></div>
      {/* <div className="hero__blur"></div> */}
      <h1 className="hero__title">
        <TypeAnimation
          cursor={true}
          sequence={["Hi! I am Steven", 4000, "I am a Web Developer!", 3000]}
        />
      </h1>
    </div>
  );
}
