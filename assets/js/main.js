//url para acessar no navegador = `http://gateway.marvel.com/v1/public/characters?ts=1675253895&apikey=10a3b1dae28508130a01a95596626d45&hash=03134fbc9a94756e12225662a66630b9&limit=10`;

const ts = '1675253895';
const publicKey = '10a3b1dae28508130a01a95596626d45';
const md5 = '03134fbc9a94756e12225662a66630b9';
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}`;
const limit = 20;
let offset = 0;

const marvelList = document.getElementById('marvelList');
const loadMoreButton = document.getElementById('loadMoreButton');


function insertHtml(character) {
    return `
        <li class="character" onclick='showDetails("${character.id}")'>
            <img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="Imagem do personagem" class="character-img">
            <span class="character-name">${character.name}</span>
        </li>
    `;
}

function loadMarvelItems(offset, limit) {
    marvelApi.getCharacters(offset, limit).then((charactersList = []) => {

        const newHtml = charactersList.map(insertHtml).join('')
        marvelList.innerHTML = newHtml
    })

}
loadMarvelItems(offset, limit)

function loadSearchedItems() {

    const inputValue = window.document.getElementById("search-txt").value;
    if (inputValue.length > 0) {
        marvelApi.getCharactersSearch(inputValue).then((charactersList = []) => {

            const newHtml = charactersList.map(insertHtml).join('')
            marvelList.innerHTML = newHtml
        })
    } else {
        loadMarvelItems(offset, limit)
    }
}


window.document.getElementById("search-txt").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        loadSearchedItems();
        return;
    } 
    
})

window.document.getElementById("search-txt").addEventListener('keydown', function(event) {
    const key = event.key; // const {key} = event; ES6+
    if (key === "Backspace") {
        const inputValue = window.document.getElementById("search-txt").value;
        console.log('inputValue :>> ', inputValue);
        if (inputValue.length < 1) {
            loadMarvelItems(offset, limit)
        }
    }
})

// DETALHES DE CADA PERSONAGEM
const modalToggle = () => {
    document.querySelector('#modal-overlay').classList.toggle('active');
}
function insertHtml2(character) {
    return `
        <div id="modal">
            <span id="name">${character.name}</span>
            <div class="modal-details">
                <img id="photoDetails" src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="">
                <span id="description">${character.description}</span>
            </div>
        </div>
    `
}
const modal = document.getElementById('modal');

function showDetails(id) {
    marvelApi.getCharactersByID(id).then((charactersList) => {

        const newHtml = charactersList.map(insertHtml2).join('')
        modal.innerHTML = newHtml
    })
    document.querySelector('#modal-overlay').classList.add('active');
}


// PAGINAÇÃO COM SCROLL
function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show')
  
      setTimeout(() => {
        offset += limit
        loadMarvelItems(offset, limit);
      }, 300);
    }, 1000)
  }

const loading = document.querySelector('.loader')

window.addEventListener('scroll', () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
        showLoading()
    }
})


// BOTÃO VOLTAR AO TOPO
const buttonTop = document.querySelector('.btn-top');

function scrollTop() {
    document.addEventListener('scroll', () => {
        if (window.pageYOffset >= 100) {
            buttonTop.classList.add('show');
        } else {
            buttonTop.classList.remove('show');
        }
    })

    buttonTop.addEventListener('click', () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    })
}
scrollTop();

