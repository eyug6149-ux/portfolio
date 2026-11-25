"use strict";

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-content, .education-card, .skill-category, " +
  ".project-card, .timeline-item, .service-group, .contact-details, .contact-form"
);

revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
