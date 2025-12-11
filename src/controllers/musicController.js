const db = require("../models/database.js");
const Track = require("../models/Track");

let nextTrackId = 1;

exports.addMusic = (req, res) => {
  const { id, title, artist, genre, popularity } = req.body;

  const track = new Track(
    id || nextTrackId++,
    title,
    artist,
    genre,
    popularity || 0
  );

  db.tracks.push(track);

  return res.json({ message: "Track added", track });
};
