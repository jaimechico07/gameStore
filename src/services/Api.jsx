// services/api.js
const API_KEY = '9dd86178ea4848b899ff1ad32a8c4055';

export const fetchGenres = async () => {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  return response.json();
};

export const fetchPlatforms = async () => {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
  return response.json();
};

export const fetchGames = async (currentPage, gamesPerPage) => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&page=${currentPage}&page_size=${gamesPerPage}`
  );
  return response.json();
};

export const fetchGamesDetails = async id => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  return response.json();
};
