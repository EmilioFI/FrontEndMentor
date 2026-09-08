const shareBtn = document.querySelector(".share-btn");
const socialBox = document.querySelector(".social-box");

shareBtn.addEventListener("click", () => {
  socialBox.classList.toggle("open");
  shareBtn.classList.toggle("open");
});
