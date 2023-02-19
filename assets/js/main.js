const offset = 0;
const ts = '1675253895';
const publicKey = '10a3b1dae28508130a01a95596626d45';
const md5 = '03134fbc9a94756e12225662a66630b9';
limit = 10;
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&limit=${limit}`;
//url para acessar no navegador = `http://gateway.marvel.com/v1/public/characters?ts=1675253895&apikey=10a3b1dae28508130a01a95596626d45&hash=03134fbc9a94756e12225662a66630b9&limit=10`;


function inserirNoHTML(marvel) {
    return `
            <li class="marvel-character>
                <span class="name">${marvel.name}</span>
                <img src="${marvel.thumbnail.path}.${marvel.thumbnail.extension}">
            </li>
    `
}

const marvelList = document.getElementById('marvelList')


marvelApi.getCharacters().then((charactersList = []) => {

    const novaLista = charactersList.map((character) => inserirNoHTML(character))
    
    const novoHtml = novaLista.join('')
    marvelList.innerHTML += novoHtml

})