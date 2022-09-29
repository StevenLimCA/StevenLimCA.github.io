import React from "react";
import AboutSection from "../../AboutSection/AboutSection";
import ContactUs from "../../ContactUs/ContactUs";
import Hero from "../../Hero/Hero";
import ProjectSection from "../../ProjectSection/ProjectSection";
import SkillSection from "../../SkillSection/SkillSection";
import "./MainPage.scss";

export default function MainPage() {
  return (
    <div className="main-page">
      <Hero />
      <AboutSection />
      <ProjectSection /> <SkillSection />
      <ContactUs />
    </div>
  );
}
