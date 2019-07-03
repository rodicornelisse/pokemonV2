/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

console.log("hallo");

let header = document.querySelector('header');
let section = document.querySelector('section');

let requestURL = 'https://rodicornelisse.github.io/pokedex/pokedexV4.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

    request.onload = function () {
    let allePokemons = request.response;
    populateHeader(allePokemons);
    showHeroes(allePokemons);
    addListeners(allePokemons);
}

function populateHeader(jsonObj) {
    let myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['titel'];
    header.appendChild(myH1);
}

function showHeroes(jsonObj) {
    let pokemon = jsonObj['pokemons'];

    for (let i = 0; i < pokemon.length; i++) {
        let myArticle = document.createElement('article');
        myArticle.setAttribute("data-id", pokemon[i].naam);
        myArticle.classList.add("is-hidden");
        let myH2 = document.createElement('h2');
        let myPara1 = document.createElement('p');
        let myPara2 = document.createElement('img');
        let myPara3 = document.createElement('p');
        let myList = document.createElement('ul');

        myH2.textContent = pokemon[i].naam;
        myPara1.textContent = pokemon[i].beschrijving;
        myPara3.textContent = 'Evoluties:';
        myPara2.src = pokemon[i].afb_url;

        let evo = pokemon[i].evoluties;
        for (let j = 0; j < evo.length; j++) {
            let listItem = document.createElement('li');
            listItem.textContent = evo[j];
            myList.appendChild(listItem);
        }

        //artikel.style.visibility = 'hidden';
        //knop.style.display = 'none';
        //section.style.display = 'hidden';
        //knop.style.display = 'none';

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}

function addListeners(jsonObj) {
  const poke = jsonObj['pokemons'];
  const targetParent = document.querySelector('body > article:last-of-type');

  for (let i = 0; i < poke.length; i++) {
    let articles = document.querySelectorAll('[data-id]');

    let el = document.createElement('button');
    el.setAttribute("data-hero", poke[i].naam);
    el.textContent = poke[i].naam;
    targetParent.appendChild(el);

    el.addEventListener("click", function (e) {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].getAttribute("data-id") === el.getAttribute("data-hero")) {
          let buttons = document.querySelectorAll('[data-hero]');

          for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle("is-hidden");
          }

          let body = document.querySelector('body');
          let header = document.querySelector('header');
          let loadingBar = document.createElement('img');
          loadingBar.src = "images/loading.gif";
          body.appendChild(loadingBar);
          body.removeChild(header);

          setTimeout( function() {
            body.removeChild(loadingBar);
            articles[i].classList.toggle("is-hidden");
          }, 3000);
        }
      }
    }, false);
  }
}

window.addEventListener('keydown', function (e) {
  if (e.key == "Backspace") {
      document.location.reload();
  }
})
