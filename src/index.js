document.addEventListener("DOMContentLoaded", (e)=> {

    const beerUrl = "http://localhost:3000/beers"
    const listGroup = document.getElementById("list-group")
    const beerDetail = document.getElementById("beer-detail")

    /// for beer names to show up correctly, give them this class
    ///  <li class="list-group-item">Beer title 1</li>

    /// beer show should look like this
    /// <h1>Beer Name</h1>
    // {/* <img src="<add beer img url here>">
    // <h3>Beer Tagline</h3>
    // <textarea>Beer Description</textarea>
    // <button id="edit-beer" class="btn btn-info">
    //   Save
    // </button> */}



    /// initial fetch 
    fetch(beerUrl)
    .then(response => response.json())
    .then(data => {
        beerList(data)
    })

    // display beer names for list
    function beerList(data){
        data.forEach(beer => {
            listGroup.insertAdjacentHTML("beforeend", `
                <li><a class="list-group-item" href=# data-id="${beer.id}">${beer.name} </a></li>
            `)
        })
}
    listGroup.addEventListener("click", (e)=> {
        beerDetail.innerHTML = ""
        if (e.target.className === "list-group-item"){
            let beerId = e.target.dataset.id
            fetch(`http://localhost:3000/beers/${beerId}`)
            .then(response => response.json())
            .then(beer => {
            beerDetail.insertAdjacentHTML("beforeend", `
            <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
            Save
            </button>
            `)
            })
        }
    })

    beerDetail.addEventListener("click", (e) => {
        
        if (e.target.className === "btn btn-info"){
            // console.log(e.target.dataset.id)
            let textArea = document.querySelector("textarea").value
            let beerId = e.target.dataset.id
            fetch(`http://localhost:3000/beers/${beerId}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, 
                body: JSON.stringify({
                    description: textArea
                })
            })
        }
    })



})