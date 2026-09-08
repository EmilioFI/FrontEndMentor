const prevArrow = document.querySelectorAll(".testimonial-slider__prev");
const nextArrow = document.querySelectorAll(".testimonial-slider__next");
const cards = document.querySelectorAll(".testimonial-slider__card");
const lastIndex = cards.length - 1;
let currentCard = 0;
let nextCard = 0;

document.addEventListener("keydown", (event) => {
  console.log(event.key);

  if (event.key === "ArrowLeft") {
    currentCard === 0 ? (nextCard = lastIndex) : nextCard--;
    displayCards(nextCard);
  }
  if (event.key === "ArrowRight") {
    currentCard === lastIndex ? (nextCard = 0) : nextCard++;
    displayCards(nextCard);
  }
});

prevArrow.forEach((element) => {
  element.addEventListener("click", () => {
    currentCard === 0 ? (nextCard = lastIndex) : nextCard--;
    displayCards(nextCard);
  });
});

nextArrow.forEach((element) => {
  element.addEventListener("click", () => {
    currentCard === lastIndex ? (nextCard = 0) : nextCard++;
    displayCards(nextCard);
  });
});

function displayCards(nextCard) {
  cards[currentCard].classList.add("card-hidden");
  cards[nextCard].classList.remove("card-hidden");
  currentCard = nextCard;
}
