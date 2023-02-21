//url para acessar no navegador = `http://gateway.marvel.com/v1/public/characters?ts=1675253895&apikey=10a3b1dae28508130a01a95596626d45&hash=03134fbc9a94756e12225662a66630b9&limit=10`;

const ts = '1675253895';
const publicKey = '10a3b1dae28508130a01a95596626d45';
const md5 = '03134fbc9a94756e12225662a66630b9';
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}`;
const limit = 20;
let offset = 0;

const marvelList = document.getElementById('marvelList');
const loadMoreButton = document.getElementById('loadMoreButton');

function inserirNoHTML(personagem) {
    return `
        <li class="personagem" onclick='showDetails("${personagem.id}")'>
            <img src="${personagem.thumbnail.path}/portrait_uncanny.${personagem.thumbnail.extension}" alt="Imagem do personagem" class="personagem-imagem">
            <span class="personagem-nome">${personagem.name}</span>
        </li>
    `;
}

function loadMarvelItems(offset, limit) {
    marvelApi.getCharacters(offset, limit).then((charactersList = []) => {

        const novoHtml = charactersList.map(inserirNoHTML).join('')
        marvelList.innerHTML += novoHtml
    })

}
loadMarvelItems(offset, limit)

// DETALHES DE CADA PERSONAGEM
const modalToggle = () => {
    document.querySelector('#modal-overlay').classList.toggle('active');
}
function inserirNoHTML2(personagem) {
    return `
        <div id="modal">
            <span id="name">${personagem.name}</span>
            <div class="modal-details">
                <img id="photoDetails" src="${personagem.thumbnail.path}/portrait_uncanny.${personagem.thumbnail.extension}" alt="">
                <span id="description">${personagem.description}</span>
            </div>
        </div>
    `
}
const modal = document.getElementById('modal');

function showDetails(id) {
    marvelApi.getCharactersByID(id).then((charactersList) => {

        const novoHtml = charactersList.map(inserirNoHTML2).join('')
        modal.innerHTML = novoHtml
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

// PESQUISA 

function pesquisa(e) {

}

// BOTÃO VOLTAR AO TOPO
const buttonTop = document.querySelector('.smoothscroll-top');

if(buttonTop) {
    function scrollTop() {
        document.addEventListener('scroll', () => {
            if(window.pageXOffset > 100) {
                buttonTop.classList.add('show');
            } else {
                buttonTop.classList.remove('show');
            }
        })

        buttonTop.addEventListener('click', () => {
            window.scroll({
                top: 0,
                behavior:'smooth'
            })
        })
    }
    scrollTop();
}

