document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is loaded');
  const listGroup = document.querySelector(".list-group")
  const beerDetail = document.querySelector("#beer-detail")
 
  getBeers()

  function getBeers(){
    fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(beers => beers.forEach(beer => {renderBeers(beer)}))
  }

  function renderBeers(beer){
    listGroup.insertAdjacentHTML("beforeend",`
    <a><li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li></a>`)
  }

  listGroup.addEventListener('click', e => {
    beerDetail.innerHTML = " "
    beerInfo = getBeerId(e.target)
  })

  function getBeerId(e){
    fetch(`http://localhost:3000/beers/${e.dataset.beerId}`)
    .then(response => response.json())
    .then(beer => {
      beerDetail.insertAdjacentHTML("beforeend",`
       <h1>${beer.name}</h1>
       <img src=${beer.image_url}>
       <h3>${beer.tagline}</h3>
       <textarea>Beer Description</textarea>
       <button id="edit-beer" class="btn btn-info" data-edit-beer-id="${beer.id}">Save</button>`)})
  }
});


