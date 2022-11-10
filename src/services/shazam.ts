const options: object = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  },
};

async function search(term: string) {
  const searchedSongs = await fetch(
    `https://shazam.p.rapidapi.com/search?term=${term}&locale=en-US&offset=0&limit=30`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return searchedSongs;
}

async function searchAutoComplete(term: string) {
  const suggestions = await fetch(
    `https://shazam.p.rapidapi.com/auto-complete?term=${term}&locale=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return suggestions;
}

async function getTopTracks() {
  const topTracks = await fetch(
    "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return topTracks;
}

async function getListRecommendations() {
  const recommendations = await fetch(
    "https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return recommendations;
}

async function getSongDetails(key: string) {
  const details = await fetch(
    "https://shazam.p.rapidapi.com/songs/get-details?key=" +
      { key } +
      "&locale=en-US",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return details;
}

export const shazam = {
  search,
  searchAutoComplete,
  getTopTracks,
  getListRecommendations,
  getSongDetails,
};
