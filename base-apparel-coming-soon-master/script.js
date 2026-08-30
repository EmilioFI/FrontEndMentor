const form = document.getElementById("email-form");
const submitBtn = document.querySelector(".submit-btn");
const emailField = document.querySelector(".email-field");
const infoMessage = document.querySelector(".info-message");
const warningIcon = document.querySelector(".warning-icon");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("GET-email");
  const isValid = emailInput.checkValidity();

  if (!isValid || emailInput.value === "") {
    emailField.style.outline = "2px solid var(--Red-500)";
    infoMessage.textContent = "Please provide a valid email";
    infoMessage.style.color = "var(--Red-500)";
    warningIcon.classList.remove("hidden");
  } else {
    warningIcon.classList.add("hidden");
    emailField.style.outline = "";
    infoMessage.textContent = "Email submitted successfully!";
    infoMessage.style.color = "hsl(150, 100%, 30%)";
  }
});
emailField.addEventListener("keyup", () => {
  if (emailField.value == "") {
    warningIcon.classList.add("hidden");
    emailField.style.outline = "";
    infoMessage.textContent = "";
  }
});
