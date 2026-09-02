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
