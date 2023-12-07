let pokemons = []; // Globale Variable
let pokemonsJson = []; 
let now;

async function fetchPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15;';
    let resp = await fetch(url);
    let respJson = await resp.json(); //-> JSON String -> JSON Object 
    pokemons = respJson.results; // -> Results Array from JSON
}

async function init() {
    await fetchPokemon();
    loadPokemonIndex();
}

async function loadPokemonIndex() {
    let container = document.getElementById("root");
    container.innerHTML = "";
    for(let i = 0;i < pokemons.length;i++) {
        let url = pokemons[i].url;
        let resp = await fetch(url);
        let respJson = await resp.json();
        pokemonsJson.push(respJson);
        createHTMLPokemonCard(container, respJson);
    }
}

function createHTMLPokemonCard(container, json) {
    container.innerHTML += /*html*/`
        <div class='card ${json.types[0].type.name}' onclick="createHTMLPokemonPopup(${json.id})">
            <div class="pokemonInfo">
                <p class="pokeName">${json.name}</p>
                <div class="types-list" id=${json.id}>
                    
                </div>
            </div>
            <div class="pokemonImage">
                <img src=${json.sprites.front_default}>
            </div>
        </div>
    `

    mapPokemonType(json);
}

function mapPokemonType(json) {
    let typesList = document.getElementById(json.id);
    typesList.innerHTML = "";
    json.types.map((type) => {
        typesList.innerHTML += /*html*/`
            <p>${type.type.name}</p>
        `
    });
}

function createHTMLPokemonPopup(index) {
    now = index;
    let popup_container = document.getElementById("popup-container");
    popup_container.style = "display: flex;";
    let pokemonJson = pokemonsJson[index];
    let pokemonName = document.getElementById("pokemon-popup-name");
    pokemonName.innerHTML = pokemonJson.name;
}



