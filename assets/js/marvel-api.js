const marvelApi = {}

function convertMarvelApitoMarvel(marvelDetail) {
    const personagem = new Character()

    personagem.nome = marvelDetail.name;
    personagem.description = marvelDetail.description;

    personagem.foto = marvelDetail.thumbnail.path;
    personagem.extensao = marvelDetail.thumbnail.extension;

    return personagem;
}

console.log(convertMarvelApitoMarvel(personagem.nome))

marvelApi.getMarvelDetail = () => {
    const ts = "1675253895";
    const publicKey = "10a3b1dae28508130a01a95596626d45";
    const md5 = "03134fbc9a94756e12225662a66630b9";
    limit = 10;
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&limit=${limit}`;

    return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.data.results)
      .then((results = []) => results.map(convertMarvelApitoMarvel))
      
      .catch((error) => console.error(error));
}






marvelApi.getCharacters = () => {
    const offset = 0;
    const ts = '1675253895';
    const publicKey = '10a3b1dae28508130a01a95596626d45';
    const md5 = '03134fbc9a94756e12225662a66630b9';
    limit = 10;
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.data.results)

        
        .catch((error) => console.error(error))
}