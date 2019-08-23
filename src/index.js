document.addEventListener("DOMContentLoaded", function () { })

fetchBeers()

const listGroup = document.getElementById("list-group")
const beerDetail = document.getElementById("beer-detail")
document.addEventListener("click", function (e) { sortEvents(e) })

function fetchBeers() {
    fetch(`http://localhost:3000/beers`)
        .then(resp => resp.json())
        .then(beers =>
            beers.forEach(beer => {
                renderBeer(beer)
            }))
}

function renderBeer(beer) {
    listGroup.insertAdjacentHTML("beforeend", `
    <li class="list-group-item" data-beer-id=${beer.id}>${beer.name}</li>
    `)
}

function sortEvents(e) {
    if (e.target.className === "list-group-item") {
        renderFeaturedBeer(e.target.dataset.beerId)
    }
    if (e.target.className === "btn btn-info") {
        let beerDescription = document.getElementById("beer-description").value
        editFeaturedBeer(e.target.dataset.beerId, beerDescription)
    }
}

function renderFeaturedBeer(id) {
    beerDetail.innerHTML = ""
    fetch(`http://localhost:3000/beers/${id}`)
        .then(resp => resp.json())
        .then(beer =>
            beerDetail.insertAdjacentHTML("beforeend",
                `<h1>${beer.name}</h1>
                <img src=${beer.image_url}></img>
                <h3>${beer.tagline}</h3>
                <textarea id="beer-description">${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info" data-beer-id=${beer.id}>Save</button>`
            ))
}

function editFeaturedBeer(id, text) {
    fetch(`http://localhost:3000/beers/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ description: text })
    })
        .then(resp => resp.json())
        .then(data => renderFeaturedBeer(data.id))
}
