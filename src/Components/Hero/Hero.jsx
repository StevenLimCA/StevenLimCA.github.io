import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__quote"></div>
      <div className="hero__wrap">
        <h1 className="hero__title">
          <TypeAnimation
            cursor={true}
            sequence={["Hi!👋", 3000, "I am Steven Lim", 2000]}
            repeat={Infinity}
          />{" "}
        </h1>
        <p className="hero__text"></p>
      </div>
    </div>
  );
}
