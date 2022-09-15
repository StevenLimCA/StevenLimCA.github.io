import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero() {
  return (
    <div className="hero">
      <div className="sun"></div>
      <div className="cloud"></div>
      <h1 className="hero__title">
        {" "}
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I am a Full Stack Web Developer",
          ]}
        />
        <div className="hero__emoji">🙋🏻‍♂️</div>
      </h1>
    </div>
  );
}
