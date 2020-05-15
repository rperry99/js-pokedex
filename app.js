let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentMonNum = 1;
let startingUrl = baseUrl + currentMonNum;

const pokeNum = get("pokeNum");
const pokeName = get("pokeName");
const pokeImg = get("pokeImg");
const leftArrow = get("leftArrow");
const rightArrow = get("rightArrow");
const normalColor = get("normalColor");
const shinyColor = get("shinyColor");
const searchButton = get("searchButton");
const searchbar = get("searchbar");
const flavorText = get("flavorText");
const type1 = get("type1");
const type2 = get("type2");

getNewPokemon(startingUrl);

leftArrow.onclick = function () {
  if (currentMonNum > 1) {
    currentMonNum--;
    let newUrl = baseUrl + currentMonNum.toString();
    console.log(newUrl);
    getNewPokemon(newUrl);
  }
};
rightArrow.onclick = function () {
  if (currentMonNum < 807) {
    currentMonNum++;
    let newUrl = baseUrl + currentMonNum.toString();
    console.log(newUrl);
    getNewPokemon(newUrl);
  }
};

searchButton.onclick = function (e) {
  e.preventDefault;
  getPokemonFromSearch();
};
searchbar.onkeyup = function (e) {
  if (e.keyCode === 13) {
    searchButton.click();
  }
};

function getPokemonFromSearch() {
  if (searchbar.value != "") {
    let newUrl = baseUrl + searchbar.value;
    getNewPokemon(newUrl);
    searchbar.value = "";
  }
}

function get(element) {
  return document.getElementById(element);
}

function setPokemon(mon) {
  pokeNum.innerHTML = "#" + mon.id;
  pokeName.innerHTML = mon.name;
  pokeImg.src = mon.sprites.front_default;

  if (mon.types.length === 2) {
    resetTypesClass();
    type1.innerHTML = mon.types[1].type.name;
    type2.innerHTML = mon.types[0].type.name;
    type1.classList.add(`${mon.types[1].type.name}`);
    type2.classList.add(`${mon.types[0].type.name}`);
    // Type 1 is set as type2 here because the API has the pokemon types backwards.
  } else {
    resetTypesClass();
    type1.innerHTML = mon.types[0].type.name;
    type1.classList.add(`${mon.types[0].type.name}`);
    type2.innerHTML = ""; //Resets type 2 since the pokemon only has one type
    type2.classList.add("hideType");
  }
}

function resetTypesClass() {
  type1.className = "";
  type2.className = "";
}

function getNewPokemon(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      // Do the thing
      setPokemon(pokemon);
      currentMonNum = pokemon.id;
      getDexEntry(currentMonNum);

      normalColor.onclick = function () {
        pokeImg.src = pokemon.sprites.front_default;
      };
      shinyColor.onclick = function () {
        pokeImg.src = pokemon.sprites.front_shiny;
      };
    })
    .catch(function (error) {
      console.log("Uh-oh", error);
    });
}

function getDexEntry(pokemonNumber) {
  url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber.toString();
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      for (let i = 0; i < pokemon.flavor_text_entries.length; i++) {
        if (pokemon.flavor_text_entries[i].language.name === "en") {
          flavorText.innerHTML = pokemon.flavor_text_entries[i].flavor_text;
          break;
        }
      }
    })
    .catch(function (error) {
      console.log("Uh-Oh", error);
    });
}
