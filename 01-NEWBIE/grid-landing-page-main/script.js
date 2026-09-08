const burguer = document.querySelector(".burguer")
const pannel = document.getElementById("navPanel")
const overlay = document.querySelector(".overlay")
const body = document.body

burguer.addEventListener('click', menuAction)

overlay.addEventListener('click', menuAction)

function menuAction() {
    burguer.classList.toggle("open")   
    pannel.classList.toggle("open")
    overlay.classList.toggle("open")
    document.body.classList.toggle('open')
}


