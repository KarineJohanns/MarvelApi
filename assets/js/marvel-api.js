const marvelApi = {};

marvelApi.getCharacters = async (offset = 0, limit = 5) => {
  const ts = "1675253895";
  const publicKey = "10a3b1dae28508130a01a95596626d45";
  const md5 = "03134fbc9a94756e12225662a66630b9";

  const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const jsonBody = await response.json();
    return jsonBody.data.results;
  } catch (error) {
    return console.error(error);
  }
};

marvelApi.getCharactersByID = async (name) => {
  const ts = "1675253895";
  const publicKey = "10a3b1dae28508130a01a95596626d45";
  const md5 = "03134fbc9a94756e12225662a66630b9";
  const url = `http://gateway.marvel.com/v1/public/characters/${name}?ts=${ts}&apikey=${publicKey}&hash=${md5}`;
  const response = await fetch(url);
  const jsonBody = await response.json();
  return jsonBody.data.results;
};
//TESTE PARA PESQUISA
marvelApi.getCharactersSearch = async (inputValue) => {
  const ts = "1675253895";
  const publicKey = "10a3b1dae28508130a01a95596626d45";
  const md5 = "03134fbc9a94756e12225662a66630b9";
  const url2 = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5}&nameStartsWith=${inputValue}`;

  const response = await fetch(url2);
  const jsonBody = await response.json();
  return jsonBody.data.results;
};
