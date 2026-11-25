"use strict";

document.documentElement.classList.add("js");

const currentYearElements = document.querySelectorAll("[data-current-year]");
const currentYear = new Date().getFullYear();

currentYearElements.forEach((element) => {
  element.textContent = String(currentYear);
});

const projectDetailsButton = document.querySelector("[data-project-details]");

if (projectDetailsButton) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog";
  dialog.setAttribute("aria-labelledby", "e-commerce-project-dialog-title");
  dialog.innerHTML = `
    <div class="project-dialog-content">
      <button class="dialog-close" type="button" aria-label="Close project details">×</button>
      <h3 id="e-commerce-project-dialog-title">E-commerce Website</h3>
      <p>
        A ShopSphere storefront interface featuring product discovery, category
        navigation, promotional offers, and a product-focused landing page.
        Repository and live-demo links are omitted because verified URLs are not available.
      </p>
    </div>
  `;
  document.body.appendChild(dialog);

  const closeButton = dialog.querySelector(".dialog-close");

  projectDetailsButton.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
