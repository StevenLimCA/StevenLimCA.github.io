import React from "react";
import "./Background.scss";
import TypeAnimation from "react-type-animation";

export default function Background() {
  return (
    <div className="background">
      <div className="sun"></div>
      <div className="cloud"></div>
      <h1 className="background__title">
        {" "}
        🙋🏻‍♂️
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I am a Full Stack Web Developer!",
          ]}
        />{" "}
      </h1>
    </div>
  );
}
