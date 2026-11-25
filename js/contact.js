"use strict";

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector("[data-submit-button]");
  const submitLabel = contactForm.querySelector("[data-submit-label]");
  const formStatus = contactForm.querySelector("[data-form-status]");

  const fields = {
    name: {
      input: contactForm.elements.name,
      error: document.querySelector("#name-error"),
      message: "Please enter your full name.",
    },
    email: {
      input: contactForm.elements.email,
      error: document.querySelector("#email-error"),
      message: "Please enter a valid email address.",
    },
    subject: {
      input: contactForm.elements.subject,
      error: document.querySelector("#subject-error"),
      message: "Please enter a subject.",
    },
    message: {
      input: contactForm.elements.message,
      error: document.querySelector("#message-error"),
      message: "Please enter a message.",
    },
  };

  function clearFieldError(field) {
    field.input.classList.remove("invalid");
    field.input.removeAttribute("aria-invalid");
    field.error.textContent = "";
  }

  function showFieldError(field, message) {
    field.input.classList.add("invalid");
    field.input.setAttribute("aria-invalid", "true");
    field.error.textContent = message;
  }

  function validateField(field) {
    const value = field.input.value.trim();

    if (!value) {
      showFieldError(field, field.message);
      return false;
    }

    if (field.input.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showFieldError(field, field.message);
        return false;
      }
    }

    clearFieldError(field);
    return true;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
      if (field.input.classList.contains("invalid")) validateField(field);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.className = "form-status";
    formStatus.textContent = "";

    const validationResults = Object.values(fields).map((field) => validateField(field));
    const isValid = validationResults.every((result) => result);

    if (!isValid) {
      const firstInvalid = Object.values(fields).find((field) =>
        field.input.classList.contains("invalid")
      );
      firstInvalid.input.focus();
      formStatus.textContent = "Please correct the highlighted fields.";
      formStatus.classList.add("error");
      return;
    }

    submitButton.disabled = true;
    submitLabel.textContent = "Preparing Message...";

    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const subject = fields.subject.input.value.trim();
    const message = fields.message.input.value.trim();
    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitLabel.textContent = "Send Message";
      formStatus.textContent =
        "Your email application will open with the message prepared.";
      formStatus.className = "form-status success";
      window.location.href =
        `mailto:eyug6149@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    }, 300);
  });
}
