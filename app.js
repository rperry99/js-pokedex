let baseUrl = "https://pokeapi.co/api/v2/pokemon/";
let startingUrl = baseUrl + "3";
let currentMonNum;

const pokeNum = get("pokeNum");
const pokeName = get("pokeName");
const pokeImg = get("pokeImg");
const leftArrow = get("leftArrow");
const rightArrow = get("rightArrow");
const normalColor = get("normalColor");
const shinyColor = get("shinyColor");

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

function get(element) {
  return document.getElementById(element);
}

function setPokemon(mon) {
  pokeNum.innerHTML = "#" + mon.id;
  pokeName.innerHTML = mon.name;
  pokeImg.src = mon.sprites.front_default;
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
