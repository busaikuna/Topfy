const axios = require("axios");
const fetch = require("node-fetch");

const ITUNES_API = "https://itunes.apple.com/search";

async function searchMusic(query, limit = 20) {
  try {
    const url = `${ITUNES_API}?term=${encodeURIComponent(query)}&media=music&limit=${limit}&country=US`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    return response.data.results.map((item) => ({
      id: item.trackId?.toString(),
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName || item.trackName,
      genre: item.primaryGenreName || "Unknown",
      coverUrl: item.artworkUrl100
        ? item.artworkUrl100.replace("100x100", "500x500")
        : "",
      previewUrl: item.previewUrl || "",
      duration: Math.floor(item.trackTimeMillis / 1000) || 0,
    }));
  } catch (error) {
    console.error("iTunes API Error:", error);
    return [];
  }
}

async function getMusicById(id) {
  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
    if (!response.ok) throw new Error("Erro na API do iTunes");
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;
    const track = data.results[0];
    return {
      title: track.trackName,
      artist: track.artistName,
      genre: track.primaryGenreName,
      coverUrl: track.artworkUrl100,
      duration: Math.floor(track.trackTimeMillis / 1000),
      albumArt: track.artworkUrl100,
    };
  } catch (err) {
    console.error("Erro getMusicById:", err);
    throw err;
  }
}

module.exports = { searchMusic, getMusicById };