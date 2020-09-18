// API Url
let pokemon = 'alakazam';
let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

// Elements for the pop-up modal
const body = document.body;
const modal = get('modalContainer');
const pokeNum = get('pokeNum');
const pokeName = get('pokeName');
const regularSprite = get('regSprite');
const shinySprite = get('shinySprite');
const type1 = get('type1');
const type2 = get('type2');
const flavorText = get('flavorText');

// Variable for the current pokemon's ID
let currentPokemon;

// Function to quickly get elements
function get(element) {
  return document.getElementById(element);
}

// Function to set the pokemon information in the modal
function setPokemon(mon) {
  pokeNum.innerText = `#${mon.id}`;
  currentPokemon = mon.id;
  pokeName.innerText = mon.name;
  regularSprite.src = mon.sprites.front_default;
  shinySprite.src = mon.sprites.front_shiny;
  // Reset the class for the types so a new type class can be added
  type1.className = '';
  type2.className = '';
  // Set Type 1's name and color
  type1.innerText = mon.types[0].type.name;
  type1.classList.add(`${mon.types[0].type.name}`);
  // If the pokemon has 2 types, set type 2's name and color, if not, remove type 2
  if (mon.types.length === 2) {
    type2.innerHTML = mon.types[1].type.name;
    type2.classList.add(`${mon.types[1].type.name}`);
  } else {
    type2.innerHTML = '';
    type2.classList.add('hideType');
  }
  // Get the dex entry
  getDexEntry(mon.id);
}

// Displays a new pokemon to the user
function getNewPokemon(pokemon) {
  let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(pokeApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      setPokemon(pokemon);
    })
    .catch(function (error) {
      console.log('Uh-oh', error);
    });
}

function getDexEntry(pokemonNumber) {
  let dexEntryUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`;
  fetch(dexEntryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      for (let i = 0; i < pokemon.flavor_text_entries.length; i++) {
        if (pokemon.flavor_text_entries[i].language.name === 'en') {
          let flavor = `${pokemon.flavor_text_entries[i].flavor_text}`;
          let finalFlavor;

          // For some reason, in the API, there is a random arrow in the text, thjis removes it.
          if (flavor.includes('')) {
            finalFlavor = flavor.replace('', ' ');
          }

          // Sets the flavor text
          flavorText.innerText = finalFlavor; // Bug here
          break;
        }
      }
    })
    .catch(function (error) {
      console.log('Uh-Oh', error);
    });
}

// Function to close the modal
function closeModal() {
  modal.classList.add('hideType');

  // Temporary; so the modal pops back up without needing a refresh
  setTimeout(() => {
    modal.classList.remove('hideType');
  }, 1000);
}

// Temporary; Change the string in here to see a different pokemon
getNewPokemon('delphox');
