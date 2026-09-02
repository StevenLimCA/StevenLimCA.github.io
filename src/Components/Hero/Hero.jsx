import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero() {
  return (
    <div className="hero" id="home">
      <div className="sun"></div>
      <div className="cloud"></div>
      <h1 className="hero__title">
        {" "}
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I build friendly full-stack web apps.",
          ]}
        />
      </h1>{" "}
      <p className="hero__subtitle">
        Full-stack developer focused on practical products, clean interfaces,
        and reliable workflows.
      </p>
      <div className="hero__emoji slide-up">🙋🏻‍♂️</div>
    </div>
  );
}
