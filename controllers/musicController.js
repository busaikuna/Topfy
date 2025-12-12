const topfy = require("./topfyInstance");
const Music = require("../models/Music");
const itunesService = require("../services/itunesService");

exports.explore = async (req, res) => {
  try {
    const musics = await itunesService.searchMusic("top hits", 50);
    const genres = [...new Set(musics.map(m => m.genre))];
    res.render("explore", { title: "Explore", musics, genres });
  } catch (error) {
    res.status(500).send("Erro ao carregar a página Explore");
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.redirect("/music/explore");
    const results = await itunesService.searchMusic(q, 30);
    res.render("search", { title: "Search Results", query: q, results });
  } catch (error) {
    res.status(500).send("Erro ao realizar busca");
  }
};

exports.popular = (req, res) => {
  try {
    const popular = topfy.getMostPopular(20);
    res.render("popular", { title: "Most Popular", musics: popular });
  } catch (error) {
    res.status(500).send("Erro ao carregar músicas populares");
  }
};

exports.play = (req, res) => {
  try {
    const { id } = req.params;
    const user = req.session.user;
    if (!user) return res.redirect("/user/login");
    const success = topfy.playMusic(user, id);
    if (success) res.json({ success: true });
    else res.status(404).json({ success: false, message: "Music not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao tocar música" });
  }
};

exports.addMusicForm = (req, res) => {
  res.render("add-music", { title: "Add Music" });
};

exports.searchAPI = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.json({ results: [] });
    const apiResults = await itunesService.searchMusic(query, 30);
    res.json({ results: apiResults });
  } catch (error) {
    res.status(500).json({ results: [] });
  }
};

exports.fetchFromAPI = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID required" });
    const details = await itunesService.getMusicById(id);
    if (!details) return res.status(404).json({ error: "Music not found" });
    res.json(details);
  } catch (error) {
    console.error("Erro fetchFromAPI:", error);
    res.status(500).json({ error: "Erro ao buscar música na API" });
  }
};

exports.addMusic = async (req, res) => {
  try {
    const { title, artist, genre, coverUrl, duration } = req.body;
    if (!title || !artist || !genre) return res.status(400).json({ error: "Missing required fields" });
    const id = Date.now().toString();
    const music = new Music(id, title, artist, genre, 0, coverUrl || "", Number.parseInt(duration) || 0);
    topfy.addMusic(music);
    res.json({ success: true, music: music.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao adicionar música" });
  }
};

exports.library = (req, res) => {
  try {
    const library = topfy.getLibrary();
    const allMusic = library.getAll();
    res.render("library", { title: "Music Library", musics: allMusic });
  } catch (error) {
    res.status(500).send("Erro ao carregar biblioteca");
  }
};
