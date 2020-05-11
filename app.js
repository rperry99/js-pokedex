var baseUrl = "https://pokeapi.co/api/v2/pokemon/";

let randNum = Math.floor(Math.random() * 806 + 1);
let url = baseUrl + randNum;
console.log(url);

const pokeNum = get("pokeNum");
const pokeName = get("pokeName");
const pokeImg = get("pokeImg");
const leftArrow = get("leftArrow");
const rightArrow = get("rightArrow");
const normalColor = get("normalColor");
const shinyColor = get("shinyColor");

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (pokemon) {
    // Do the thing
    console.log(pokemon.name);
    pokeNum.innerHTML = "#" + pokemon.order;
    pokeName.innerHTML = pokemon.name;
    pokeImg.src = pokemon.sprites.front_default;

    leftArrow.onclick = function () {
      pokemon.order -= 1;
      url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.order;
      console.log(url);
    };

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

function get(element) {
  return document.getElementById(element);
}
