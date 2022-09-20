import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero() {
  return (
    <div className="hero" id="">
      <div className="sun"></div>
      <div className="cloud"></div>
      <h1 className="hero__title">
        {" "}
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I am a Full Stack Web Developer!",
          ]}
        />
      </h1>{" "}
      <div className="hero__emoji slide-up">🙋🏻‍♂️</div>
    </div>
  );
}
