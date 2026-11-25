"use strict";

window.PORTFOLIO_SOCIAL_LINKS = Object.freeze({
  linkedin: "https://www.linkedin.com/in/eyasu-guta-a67b1337b/",
  github: "https://github.com/eyug6149-ux",
  upwork: "",
  fiverr: "",
});

const socialProfiles = [
  {
    key: "linkedin",
    name: "LinkedIn",
    cta: "Connect on LinkedIn",
    icon: '<path d="M5 3.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM1.7 7h3v9h-3zm5 0h2.9v1.2h.1A3.2 3.2 0 0 1 12.6 6.7c3.1 0 3.7 2 3.7 4.6V16h-3v-4.2c0-1 0-2.4-1.5-2.4s-1.8 1.1-1.8 2.3V16h-3z"/>',
  },
  {
    key: "github",
    name: "GitHub",
    cta: "View My GitHub",
    icon: '<path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.49-2.7-.95-2.7-.95-.36-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.72 1.23 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.65-.9-3.65-3.97 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.7 7.7 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.08-1.88 3.76-3.67 3.96.29.25.54.73.54 1.47v2.09c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/>',
  },
  {
    key: "upwork",
    name: "Upwork",
    cta: "Hire Me on Upwork",
    icon: '<path d="M3.3 2h2.1l1.5 4.1c.8-1.5 1.9-2.3 3.4-2.3 2.5 0 4 2 4 4.4 0 2.6-1.7 4.4-4.1 4.4-1.7 0-2.9-.9-3.6-2.7l-1.2 4.2H3.2l2-6.1zm6.8 8.5c1.2 0 2-1 2-2.3s-.8-2.3-2-2.3c-1.1 0-1.9.9-2.1 2.3.2 1.4 1 2.3 2.1 2.3Z"/>',
  },
  {
    key: "fiverr",
    name: "Fiverr",
    cta: "View My Fiverr Profile",
    icon: '<path d="M5 2h9v2H7v3h5v2H7v5H5V9H3V7h2z"/><circle cx="14.5" cy="13" r="1.5"/>',
  },
];

function createSocialIcon(profile) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  icon.innerHTML = profile.icon;
  return icon;
}

function getValidProfileUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function createSocialLink(profile, href, variant) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", profile.name);
  link.className = `social-profile-link social-profile-link-${variant}`;
  link.appendChild(createSocialIcon(profile));

  if (variant === "contact") {
    const details = document.createElement("span");
    const name = document.createElement("small");
    const action = document.createElement("strong");
    name.textContent = profile.name;
    action.textContent = profile.cta;
    details.append(name, action);
    link.appendChild(details);
  } else if (variant === "hero") {
    link.title = profile.name;
  } else {
    link.setAttribute("aria-label", profile.name);
  }

  return link;
}

const socialLinks = window.PORTFOLIO_SOCIAL_LINKS || {};

document.querySelectorAll("[data-social-links]").forEach((container) => {
  const variant = container.dataset.socialLinks;

  socialProfiles.forEach((profile) => {
    const href = getValidProfileUrl(socialLinks[profile.key]);
    if (href) container.appendChild(createSocialLink(profile, href, variant));
  });

  container.hidden = container.childElementCount === 0;
});

const socialCtaContainer = document.querySelector('[data-social-ctas="hero"]');

if (socialCtaContainer) {
  socialProfiles.forEach((profile) => {
    const href = getValidProfileUrl(socialLinks[profile.key]);
    if (!href) return;

    const link = document.createElement("a");
    link.className = "button button-secondary social-cta";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", profile.cta);
    link.appendChild(createSocialIcon(profile));
    link.append(document.createTextNode(profile.cta));
    socialCtaContainer.appendChild(link);
  });

  socialCtaContainer.hidden = socialCtaContainer.childElementCount === 0;
}
