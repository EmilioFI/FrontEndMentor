const list = document.getElementById("list")
const titleCategory = document.querySelector(".category")
const scoreCategory = document.querySelector(".score-category")
const iconImage = document.querySelector(".icon")
const colorElements = {
    Reaction: { color: 'hsl(0, 100%, 67%)', bg: 'hsla(0, 100%, 67%, 0.08)' },
    Memory: { color: 'hsl(39, 100%, 56%)', bg: 'hsla(39, 100%, 56%, 0.08)' },
    Verbal: { color: 'hsl(166, 100%, 37%)', bg: 'hsla(166, 100%, 37%, 0.08)' },
    Visual: { color: 'hsl(234, 85%, 45%)', bg: 'hsla(234, 85%, 45%, 0.08)' }
}

async function getData() {
    
    try {
        const response = await fetch("data.json")
        const data = await response.json()

        data.forEach(element => {

            const colorItem = colorElements[element.category]

            const newElement = document.createElement("li")
            newElement.classList.add('summary-item')            

            newElement.innerHTML = `
            <div class="item-title">
                <img class="icon" src="${element.icon}" alt="${element.category}">
                <span class="category">${element.category}</span>
            </div>
            <div>
                <span>${element.score}</span><span class="max-score"> / 100</span>
            </div>
            `
            const categoryClass = newElement.querySelector('.category')
                        
            categoryClass.style.color = colorItem.color
            newElement.style.backgroundColor = colorItem.bg
            
            list.appendChild(newElement)
        });
    }
    catch (error) {
        console.log("error", error)
    }
    
}
getData()