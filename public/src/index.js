document.addEventListener("DOMContentLoaded", function() {
  getBeers()
  const getBeer = document.querySelector(".list-group")
  const getDeatil = document.querySelector("#beer-detail")
  const getTextBox = document.querySelector(".text")
  function getBeers() {
    fetch(`http://localhost:3000/beers`)
      .then(data => data.json())
      .then(json => renderBeers(json))
  }
  function getOneBeer(oneBeer) {
    fetch(`http://localhost:3000/beers/${oneBeer}`)
      .then(data => data.json())
      .then(json => getDescription(json))
  }
  //   ;<ul class="list-group">
  //     <li class="list-group-item">Beer title 1</li>
  //     <li class="list-group-item">Beer title 2</li>
  //   </ul>

  function updateBeer(oneBeer) {
    fetch(`http://localhost:3000/beers/${oneBeer}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(description:)
    })
      .then(data => data.json())
      .then(json => console.log(json))
  }
  function renderBeers(json) {
    json.forEach(beer => {
      const createList = document.createElement("li")
      createList.dataset.id = beer.id
      createList.innerHTML = beer.name
      getBeer.append(createList)
    })
  }
  getBeer.addEventListener("click", e => {
    getDeatil.innerHTML = ""
    let oneBeer = e.target.dataset.id
    getOneBeer(oneBeer)
  })

  function getDescription(beer) {
    const header = document.createElement("h1")
    header.innerHTML = beer.name
    getDeatil.append(header)

    // image
    const getImage = document.createElement("img")
    getImage.src = beer.image_url
    getDeatil.append(getImage)

    // tagline

    const getTagline = document.createElement("h3")
    getTagline.innerHTML = beer.tagline
    getDeatil.append(getTagline)

    // beerDescription
    const getDescription = document.createElement("textarea")
    // getDescription.className = "text"
    getDescription.innerHTML = beer.description
    getDeatil.append(getDescription)

    // button
    const createButton = document.createElement("button")
    createButton.id = "edit-beer"
    createButton.className = "btn btn-info"
    createButton.innerText = "Save"
    getDeatil.append(createButton)
  }
  //   addEventListener when clicks on the button it sends it to patch method and updates the information
  const getButton = document.querySelector(".btn btn-info")
  getButton.addEventListener("click", e => {
    console.log(getButton)
  })
})
