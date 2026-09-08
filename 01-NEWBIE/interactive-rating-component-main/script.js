const stateStart = document.querySelector(".state-start")
const stateThanks = document.querySelector(".state-thanks")
const submitBtn = document.querySelector(".submit-btn")
const ratingBtns = document.querySelectorAll(".btn")
const ratingValue = document.getElementById("value-select")
let selectedRating = null;

ratingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratingBtns.forEach(otherBtn => {
            otherBtn.classList.remove("selected")
        })
        btn.classList.add("selected")
        selectedRating = btn.textContent
    })
})

submitBtn.addEventListener('click', () => {
    if (selectedRating != null){
        ratingValue.textContent = selectedRating
        stateStart.classList.add("hidden")
        stateThanks.classList.remove("hidden")
    }    
})