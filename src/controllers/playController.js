const db = require("../models/database");

exports.play = (req, res) => {
  const { userId, trackId } = req.body;

  const track = db.tracks.find(t => t.id == trackId);
  if (!track) return res.status(404).json({ error: "Track not found" });

  track.popularity++;

  db.playHistory.push({
    userId,
    trackId,
    timestamp: new Date()
  });

  return res.json({ message: "Track played", track });
};
