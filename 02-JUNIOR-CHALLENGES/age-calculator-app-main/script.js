const form = document.querySelector(".age-calculator__form");
const formElements = document.querySelectorAll(".age-calculator__field");
const submitBtn = document.querySelector(".age-calculator__submit");
const resultsView = document.querySelectorAll(".age-calculator__result-value");

const today = new Date();

form.addEventListener("submit", (event) => {
  const dateForm = new Array(3);
  event.preventDefault();
  let isValidForm = true;

  /* en el primer foreach controlamos si se han rellenado todos los campos y que tengan valores numericos con el metodo interno checkvalidity() */

  formElements.forEach((element, index) => {
    const labelElement = element.querySelector(".age-calculator__label-field");
    const inputElement = element.querySelector(".age-calculator__input-field");
    const warningMessages = element.querySelector(
      ".age-calculator__warning-message",
    );
    const isValidField = inputElement.checkValidity();
    warningMessages.textContent = "";

    if (!isValidField) {
      warningMessages.textContent = "This field is required";
      inputElement.classList.toggle("invalid", !isValidField);
      labelElement.classList.toggle("invalid", !isValidField);
      isValidForm = false;
    } else {
      dateForm[index] = inputElement.value;
      inputElement.classList.toggle("invalid", !isValidField);
      labelElement.classList.toggle("invalid", !isValidField);
    }
  });

  const yearForm = dateForm[2];
  const monthForm = dateForm[1];
  const dayForm = dateForm[0];
  isValidDate = valueCheck(dayForm, monthForm, yearForm);

  formElements.forEach((element, index) => {
    const labelElement = element.querySelector(".age-calculator__label-field");
    const inputElement = element.querySelector(".age-calculator__input-field");
    const warningMessages = element.querySelector(
      ".age-calculator__warning-message",
    );
    if (index == 2 && !isValidDate[2]) {
      if (warningMessages.textContent === "") {
        warningMessages.textContent = "Must be in the past";
        inputElement.classList.toggle("invalid", true);
        labelElement.classList.toggle("invalid", true);
      }
      isValidForm = false;
    }
    if (index == 1 && !isValidDate[1]) {
      if (warningMessages.textContent === "") {
        warningMessages.textContent = "Must be a valid month";
        inputElement.classList.toggle("invalid", true);
        labelElement.classList.toggle("invalid", true);
      }
      isValidForm = false;
    }

    if (index == 0 && !isValidDate[0]) {
      if (warningMessages.textContent === "") {
        warningMessages.textContent = "Must be a valid day";
        inputElement.classList.toggle("invalid", true);
        labelElement.classList.toggle("invalid", true);
      }
      isValidForm = false;
    }

    if (
      index == 0 &&
      !isValidDate[3] &&
      isValidDate[0] &&
      isValidDate[1] &&
      isValidDate[2]
    ) {
      warningMessages.textContent = "Must be a valid date";
      inputElement.classList.toggle("invalid");
      labelElement.classList.toggle("invalid");

      isValidForm = false;
    }
  });

  if (isValidForm) {
    const timeElapsed = calculator(dayForm, monthForm, yearForm);
    resultsView.forEach((element, index) => {
      element.textContent = timeElapsed[index];
    });
  }
});

function valueCheck(dayForm, monthForm, yearForm) {
  const numDaysMonth = new Date(yearForm, monthForm, 0).getDate();

  isValidYear = yearForm <= today.getFullYear() ? true : false;
  isValidMonth = monthForm >= 1 && monthForm <= 12 ? true : false;
  isValidDay = dayForm >= 1 && dayForm <= 31 ? true : false;
  isValidDate = dayForm >= 1 && dayForm <= numDaysMonth ? true : false;
  return [isValidDay, isValidMonth, isValidYear, isValidDate];
}

function calculator(dayForm, monthForm, yearForm) {
  let daysElapsed = 0;
  let monthsElapsed = 0;
  let yearsElapsed = 0;

  let [monthNow, dayNow, yearNow] = [
    today.getMonth(),
    today.getDate(),
    today.getFullYear(),
  ];

  const monthFormIndex = monthForm - 1;
  const prevMonth = new Date(yearNow, monthNow, 0);
  const prevMonthDays = prevMonth.getDate();

  if (dayNow < dayForm) {
    daysElapsed = dayNow + prevMonthDays - dayForm;

    if (monthNow === 0) {
      monthNow = 11;
      yearNow--;
    } else {
      monthNow--;
    }
  } else {
    daysElapsed = dayNow - dayForm;
  }

  if (monthNow < monthFormIndex) {
    monthsElapsed = monthNow + 12 - monthFormIndex;
    yearNow--;
  } else {
    monthsElapsed = monthNow - monthFormIndex;
  }
  yearsElapsed = yearNow - yearForm;

  return [yearsElapsed, monthsElapsed, daysElapsed];
}
