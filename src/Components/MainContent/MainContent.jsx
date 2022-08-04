import React from "react";

export default function MainContent() {
  return (
    <main className="main-content">
      <div className="hero">
        <div className="hero__quote"></div>
        <div className="hero__wrap">
          <h1 className="hero__title"></h1>
          <p className="hero__text"></p>
        </div>
      </div>

      <h1 className="main-content__title">Hi I am Steven!</h1>
      <p className="main-content__text">
        I am a Web developer with a passion for technologies.{" "}
      </p>
      <p className="main-content__text">
        Whether you need a website to communicate your value proposition, or a
        web application that creates value for your clients, I am up for the
        task every step of the way.{" "}
      </p>
      <p className="main-content__text">
        Together, we are able to reduce paper waste, captivate your audience,
        generate leads, provide goods and services conveniently and as
        efficiently as possible.
      </p>
    </main>
  );
}
