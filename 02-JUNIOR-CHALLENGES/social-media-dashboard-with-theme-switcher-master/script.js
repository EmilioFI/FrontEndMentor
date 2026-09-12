const toggleBtn = document.querySelector(".toggle");
const slider = document.querySelector(".slider");

toggleBtn.addEventListener("click", () => {
  slider.classList.toggle("on");
  document.body.classList.toggle("dark-theme");
  toggleBtn.setAttribute(
    "aria-checked",
    document.body.classList.contains("dark-theme"),
  );
});
