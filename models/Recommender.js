class Recommender {
  constructor(library) {
    this.library = library
  }

  recommend(user, limit = 10) {
    const preferences = user.getPreferences()

    if (preferences.length === 0) {
      return this.library.getMostPopular(limit)
    }

    const byPreference = this.library.getAll().filter((m) => preferences.includes(m.genre.toLowerCase()))

    if (byPreference.length === 0) {
      return this.library.getMostPopular(limit)
    }

    const sorted = byPreference.sort((a, b) => b.popularity - a.popularity)
    return sorted.slice(0, limit)
  }

  recommendByGenre(genre, limit = 10) {
    return this.library.getByGenre(genre).slice(0, limit)
  }
}

module.exports = Recommender
