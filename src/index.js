document.addEventListener("DOMContentLoaded", function(event) {
  fetchBeers()
  const beerLists = document.getElementById("beer-detail")
  const listGroup = document.getElementById("list-group")
  function fetchBeers() {
    fetch("http://localhost:3000/beers")
      .then(resp => resp.json())
      .then(beers => {
        // console.log(beers)
        beers.forEach(beer => {
          renderBeers(beer)
        })
      })
  }

  function renderBeers(beers) {
    listGroup.insertAdjacentHTML(
      "beforeend",
      `
        <li class="list-group-item" data-beer-id="${beers.id}">${
        beers.name
      }</li>
  `
    )
  }
  listGroup.addEventListener("click", function(event) {
    // debugger
    // console.log(event.target.dataset.beerId)
    // console.log("yo")
    const beerId = event.target.dataset.beerId

    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(beer => {
        console.log(beer)

        const beerDetail = document.getElementById("beer-detail")
        beerDetail.innerHTML = `
          <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}{</textarea>
            <button id="edit-beer" class="btn btn-info">
              Save
          </button>
    `
        let beerButton = document.getElementById("edit-beer")
        // debugger
        beerButton.addEventListener("click", function(event) {
          console.log("hello")
          fetch(`http://localhost:3000/beers/${beerId}`, {
            method: "PATCH",
            header: {
              con
            }
          })
        })
      })
  })
})
