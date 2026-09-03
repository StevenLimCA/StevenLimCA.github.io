import React from "react";
import "./Hero.scss";
import TypeAnimation from "react-type-animation";

export default function Hero({ sceneMode }) {
  return (
    <div className={`hero hero--${sceneMode}`} id="home">
      <div className="hero__stars" aria-hidden="true"></div>
      <div className="sun" aria-hidden="true"></div>
      <div className="cloud"></div>
      <h1 className="hero__title">
        {" "}
        <TypeAnimation
          cursor={true}
          sequence={[
            "Hi! I am Steven.",
            1000,
            "I build web systems for local businesses.",
          ]}
        />
      </h1>{" "}
      <p className="hero__subtitle">
        I help clinics and service teams turn websites, forms, bookings, and
        back-office workflows into tools that feel clear and dependable.
      </p>
      <div className="hero__emoji slide-up">🙋🏻‍♂️</div>
    </div>
  );
}
