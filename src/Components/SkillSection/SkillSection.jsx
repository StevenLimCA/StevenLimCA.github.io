import React from "react";
import "./SkillSection.scss";

const capabilities = [
  {
    title: "Systems Integration",
    text: "Connect web apps, APIs, and business tools so work moves cleanly between systems.",
    icons: [
      { src: "./logos/React.svg", alt: "React" },
      { src: "./logos/node-js.svg", alt: "Node.js" },
      { src: "./logos/mysql.svg", alt: "MySQL" },
    ],
  },
  {
    title: "Workflow Automation",
    text: "Reduce repetitive admin work with reviewable, human-approved automation.",
    icons: [
      { src: "./logos/JavaScript.svg", alt: "JavaScript" },
      { src: "./logos/PowerShell.svg", alt: "PowerShell" },
      { src: "./logos/git.svg", alt: "Git" },
    ],
  },
  {
    title: "Operational Dashboards",
    text: "Build focused interfaces for queues, approvals, exceptions, and status visibility.",
    icons: [
      { src: "./logos/HTML5.svg", alt: "HTML" },
      { src: "./logos/CSS3.svg", alt: "CSS" },
      { src: "./logos/sass.svg", alt: "Sass" },
    ],
  },
  {
    title: "Forms & Notifications",
    text: "Turn website forms and internal requests into reliable email or workflow handoffs.",
    icons: [
      { src: "./logos/email.svg", alt: "Email" },
      { src: "./logos/JavaScript.svg", alt: "JavaScript" },
      { src: "./logos/github.svg", alt: "GitHub" },
    ],
  },
  {
    title: "Business Websites",
    text: "Maintain and improve websites, hosting, and digital touchpoints for local service teams.",
    icons: [
      { src: "./logos/HTML5.svg", alt: "HTML" },
      { src: "./logos/CSS3.svg", alt: "CSS" },
      { src: "./logos/git.svg", alt: "Git" },
    ],
  },
  {
    title: "AI-Assisted Prototyping",
    text: "Use local and cloud AI carefully for workflow exploration, test data, documentation, and classification support.",
    icons: [
      { src: "./logos/Bash.svg", alt: "Bash" },
      { src: "./logos/PowerShell.svg", alt: "PowerShell" },
      { src: "./logos/jira.svg", alt: "Jira" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <div className="skills" id="Skills">
      <div className="skills__background">
        <div className="skills__background--area">
          <ul className="skills__background--circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="skills__content">
            <p className="skills__eyebrow">Capabilities</p>
            <h1 className="skills__title">Ways I Help</h1>
            <p className="skills__intro">
              Practical web systems work, supported by the tools that fit the
              workflow.
            </p>
            <div className="skills__grid">
              {capabilities.map((capability) => (
                <article className="skills__card" key={capability.title}>
                  <div className="skills__card-icons" aria-hidden="true">
                    {capability.icons.map((icon) => (
                      <img
                        className="skills__card-icon"
                        src={icon.src}
                        alt=""
                        key={`${capability.title}-${icon.alt}`}
                      />
                    ))}
                  </div>
                  <h2 className="skills__card-title">{capability.title}</h2>
                  <p className="skills__card-text">{capability.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
