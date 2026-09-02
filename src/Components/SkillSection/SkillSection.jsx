import React from "react";
import "./SkillSection.scss";

const capabilities = [
  {
    title: "Systems Integration",
    text: "Connect web apps, APIs, and business tools so work moves cleanly between systems.",
    icon: "integration",
  },
  {
    title: "Workflow Automation",
    text: "Reduce repetitive admin work with reviewable, human-approved automation.",
    icon: "automation",
  },
  {
    title: "Operational Dashboards",
    text: "Build focused interfaces for queues, approvals, exceptions, and status visibility.",
    icon: "dashboard",
  },
  {
    title: "Forms & Notifications",
    text: "Turn website forms and internal requests into reliable email or workflow handoffs.",
    icon: "notifications",
  },
  {
    title: "Business Websites",
    text: "Maintain and improve websites, hosting, and digital touchpoints for local service teams.",
    icon: "website",
  },
  {
    title: "AI-Assisted Prototyping",
    text: "Use local and cloud AI carefully for workflow exploration, test data, documentation, and classification support.",
    icon: "ai",
  },
];

function CapabilityIcon({ type }) {
  const iconProps = {
    className: "skills__icon-svg",
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": "true",
  };

  const icons = {
    integration: (
      <svg {...iconProps}>
        <path d="M18 15h12M16 19l6 10M32 19l-6 10" />
        <circle cx="13" cy="15" r="5" />
        <circle cx="35" cy="15" r="5" />
        <circle cx="24" cy="34" r="5" />
      </svg>
    ),
    automation: (
      <svg {...iconProps}>
        <path d="M35 15a14 14 0 0 0-23 7" />
        <path d="M12 15v7h7" />
        <path d="M13 33a14 14 0 0 0 23-7" />
        <path d="M36 33v-7h-7" />
        <path d="M20 24h8l-4 7" />
      </svg>
    ),
    dashboard: (
      <svg {...iconProps}>
        <rect x="7" y="9" width="34" height="30" rx="4" />
        <path d="M7 18h34" />
        <path d="M15 28h5M15 33h12M27 25h8v8h-8z" />
      </svg>
    ),
    notifications: (
      <svg {...iconProps}>
        <path d="M8 16h25v18H8z" />
        <path d="m8 17 12.5 10L33 17" />
        <path d="M36 14c3.5 2.5 5 5.8 4.8 10" />
        <path d="M34 20c1.4 1.2 2.1 2.8 2 4.8" />
      </svg>
    ),
    website: (
      <svg {...iconProps}>
        <rect x="7" y="10" width="34" height="28" rx="4" />
        <path d="M7 18h34" />
        <path d="M14 27h20M14 32h12" />
        <path d="M14 14h.1M19 14h.1M24 14h.1" />
      </svg>
    ),
    ai: (
      <svg {...iconProps}>
        <path d="m24 7 2.8 7.2L34 17l-7.2 2.8L24 27l-2.8-7.2L14 17l7.2-2.8L24 7z" />
        <circle cx="12" cy="36" r="3" />
        <circle cx="24" cy="39" r="3" />
        <circle cx="36" cy="36" r="3" />
        <path d="M15 36h6M27 39l6-2" />
      </svg>
    ),
  };

  return icons[type] || icons.integration;
}

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
                  <div className="skills__card-icon-wrap" aria-hidden="true">
                    <CapabilityIcon type={capability.icon} />
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
