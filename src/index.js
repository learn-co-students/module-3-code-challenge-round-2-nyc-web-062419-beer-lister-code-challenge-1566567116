document.addEventListener("DOMContentLoaded", function() {

    // init GET fetch 
    fetchBeers()

    // DOM elements we'll need to render into
    const beerList = document.getElementById("list-group")
    const beerView = document.getElementById("beer-detail")

    // GET fetch
    function fetchBeers(){
        return fetch("http://localhost:3000/beers")
        .then(resp => resp.json())
        .then(function(beers){
            renderAllBeers(beers)
        })
    }

    // lists beers in the beerList
    function renderAllBeers(beers){
        beers.forEach(beer => {beerList.insertAdjacentHTML("beforeend",
        `
        <li class="list-group-item"><div class="indiv-beer" data-id=${beer.id}>${beer.name}</div></li>
        `)
        });
    }

    // event listener on beerList
    beerList.addEventListener("click", function(e){
        if(e.target.className == "indiv-beer"){
            let beerId = e.target.dataset.id
            beerView.innerHTML='';
            renderBeer(beerId)
        }
    })

    // using that dataset id from the above event listener as an argument
    // this GET fetch returns the indiv beer from the api
    // then passes that to a function that renders it on the page
    function renderBeer(beerId){
        return fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(function(beer){
            renderIndivBeer(beer)
        })
    }

    // called by the above fetch, this function renders the indiv beer on the page
    function renderIndivBeer(beer){
        beerView.insertAdjacentHTML("beforeend",
        `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea id="beer-description">${beer.description}</textarea>
        <button data-id="${beer.id}" id="edit-beer" class="btn btn-info">
        Save
        </button>
        `)

        // this event listener, on the Save button, helps to pass the beer id and the edited description
        // to the PATCH method below
        let saveBtn = document.getElementById("edit-beer")
        saveBtn.addEventListener("click", function(e){
            let beerId = e.target.dataset.id
            let beerDescription = document.getElementById("beer-description").value
            editBeerDescription(beerId, beerDescription)
        })
    }

    // accepting the arguments that were defined above in the Save button event listener
    // this PATCH fetch persists our new description into the database
    function editBeerDescription(beerId, beerDescription){
        fetch(`http://localhost:3000/beers/${beerId}`,{
            method: "PATCH",
            body: JSON.stringify({description: beerDescription}),
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
        .then(resp => resp.json())
        .then(beer => console.log(beer))
    }



})