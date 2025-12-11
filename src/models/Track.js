class Track {
  constructor(id, title, artist, genre, popularity = 0) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.genre = genre;
    this.popularity = popularity;
  }
}

module.exports = Track;