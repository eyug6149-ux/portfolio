"use strict";

const skillCategories = [
  {
    title: "Web Development",
    abbreviation: "WEB",
    skills: [
      "Full-Stack Development",
      "React",
      "JavaScript",
      "Node.js",
      "ExpressJS",
      "MongoDB",
      "HTML5",
      "CSS3",
      "MySQL",
      "REST API",
      "E-commerce Website Development",
      "Responsive Design",
    ],
  },
  {
    title: "Video and Content",
    abbreviation: "VID",
    skills: [
      "Video Editing",
      "YouTube Video",
      "CapCut",
      "Social Media Video",
      "Video Post-Editing",
      "Short Video",
      "AI Video Generator",
    ],
  },
];

const skillsRoot = document.querySelector("[data-skills-root]");

if (skillsRoot) {
  skillCategories.forEach((category) => {
    const categoryElement = document.createElement("article");
    categoryElement.className = "skill-category";

    const header = document.createElement("div");
    header.className = "skill-category-header";

    const icon = document.createElement("span");
    icon.className = "skill-category-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.abbreviation;

    const title = document.createElement("h3");
    title.textContent = category.title;

    const skillGrid = document.createElement("div");
    skillGrid.className = "skill-grid";

    category.skills.forEach((skillName) => {
      const skillCard = document.createElement("div");
      skillCard.className = "skill-card";
      skillCard.textContent = skillName;
      skillGrid.appendChild(skillCard);
    });

    header.append(icon, title);
    categoryElement.append(header, skillGrid);
    skillsRoot.appendChild(categoryElement);
  });
}
