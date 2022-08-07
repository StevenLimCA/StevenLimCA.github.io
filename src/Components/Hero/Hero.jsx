import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__blur">
        <div className="hero__quote"></div>
        <div className="hero__wrap">
          <p className="hero__text"></p>
        </div>
      </div>
      <div className="hero__shadow">
        {" "}
        <h1 className="hero__title">
          <TypeAnimation
            cursor={true}
            sequence={["hi! I am Steven", 4000, "I am a Web Developer!", 3000]}
          />{" "}
        </h1>
      </div>
    </div>
  );
}
