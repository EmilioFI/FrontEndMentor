const form = document.getElementById("signup-form");
const submitBtn = document.querySelector(".signup-master__form-submit");
const formElements = document.querySelectorAll(".signup-master__form-field");
const infoMessage = document.querySelector(".info-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValidForm = true;

  infoMessage.classList.add("hidden");

  formElements.forEach((element) => {
    const inputElement = element.querySelector(".signup-master__form-input");
    const warningIcon = element.querySelector(".warning-icon");
    const messageElement = element.querySelector(".warning-message");
    const isValidField = inputElement.checkValidity();

    if (!isValidField) {
      inputElement.setAttribute("aria-invalid", "true");
      inputElement.classList.toggle("is-invalid", !isValidField);
      messageElement.classList.remove("hidden");
      warningIcon.classList.remove("hidden");
      isValidForm = false;
    } else {
      inputElement.setAttribute("aria-invalid", "false");
      inputElement.classList.toggle("is-invalid", !isValidField);
      messageElement.classList.add("hidden");
      warningIcon.classList.add("hidden");
    }
  });

  if (isValidForm) {
    infoMessage.classList.remove("hidden");
    formElements.forEach((element) => {
      const inputElement = element.querySelector(".signup-master__form-input");
      inputElement.value = "";
    });
  }
});
