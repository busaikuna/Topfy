class Music {
  #id
  #title
  #artist
  #genre
  #popularity
  #coverUrl
  #duration

  constructor(id, title, artist, genre, popularity = 0, coverUrl = "", duration = 0) {
    this.#id = id
    this.#title = title
    this.#artist = artist
    this.#genre = genre
    this.#popularity = popularity
    this.#coverUrl = coverUrl
    this.#duration = duration
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#title
  }

  get artist() {
    return this.#artist
  }

  get genre() {
    return this.#genre
  }

  get popularity() {
    return this.#popularity
  }

  get coverUrl() {
    return this.#coverUrl
  }

  get duration() {
    return this.#duration
  }

  increasePopularity() {
    this.#popularity++
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      artist: this.#artist,
      genre: this.#genre,
      popularity: this.#popularity,
      coverUrl: this.#coverUrl,
      duration: this.#duration,
    }
  }
}

module.exports = Music
