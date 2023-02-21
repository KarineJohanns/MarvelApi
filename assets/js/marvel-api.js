const marvelApi = {}

marvelApi.getCharacters = (offset = 0, limit = 5) => {

    const ts = '1675253895';
    const publicKey = '10a3b1dae28508130a01a95596626d45';
    const md5 = '03134fbc9a94756e12225662a66630b9';
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.data.results)

        
        .catch((error) => console.error(error))
}

marvelApi.getCharactersByID = (id) => {
    const ts = '1675253895';
    const publicKey = '10a3b1dae28508130a01a95596626d45';
    const md5 = '03134fbc9a94756e12225662a66630b9';
    const url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${md5}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.data.results)
}