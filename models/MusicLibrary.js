class MusicLibrary {
  #musics

  constructor() {
    this.#musics = []
  }

  addMusic(music) {
    this.#musics.push(music)
  }

  getAll() {
    return [...this.#musics]
  }

  getById(id) {
    return this.#musics.find((m) => m.id === id)
  }

  getByGenre(genre) {
    return this.#musics.filter((m) => m.genre.toLowerCase() === genre.toLowerCase())
  }

  getMostPopular(limit = 5) {
    return [...this.#musics].sort((a, b) => b.popularity - a.popularity).slice(0, limit)
  }

  search(query) {
    const lowerQuery = query.toLowerCase()
    return this.#musics.filter(
      (m) => m.title.toLowerCase().includes(lowerQuery) || m.artist.toLowerCase().includes(lowerQuery),
    )
  }
}

module.exports = MusicLibrary
