const form = document.querySelector(".age-calculator__form");
const formElements = document.querySelectorAll(".age-calculator__input-field");
const submitBtn = document.querySelector(".age-calculator__submit");
const resultsView = document.querySelectorAll(".age-calculator__result-value");
console.log(resultsView);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dayForm = document.getElementById("get-day");
  const monthForm = document.getElementById("get-month");
  const yearForm = document.getElementById("get-year");
  const timeElapsed = calculator(
    dayForm.value,
    monthForm.value,
    yearForm.value,
  );
  resultsView.forEach((element, index) => {
    element.textContent = timeElapsed[index];
  });
});

function calculator(dayForm, monthForm, yearForm) {
  let daysElapsed = 0;
  let monthsElapsed = 0;
  let yearsElapsed = 0;

  const today = new Date();
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
