import React, { useState } from "react";
import "./Background.scss";

// import TypeAnimation from "react-type-animation";

export default function Background() {
  let [pageTitle, setTitle] = useState("My Projects");
  return (
    <div className="background">
      <div className="sun"></div>
      <div className="cloud"></div> {/* <div className="hero__blur"></div> */}
      {/* <h1 className="hero__title">
        <TypeAnimation cursor={true} sequence={["Hi! 🙋🏻‍♂️ I am Steven."]} />
      </h1> */}
    </div>
  );
}
