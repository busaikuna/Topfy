class User {
  #name
  #preferences
  #history

  constructor(name) {
    this.#name = name
    this.#preferences = new Set()
    this.#history = []
  }

  get name() {
    return this.#name
  }

  addPreference(genre) {
    this.#preferences.add(genre.toLowerCase())
  }

  removePreference(genre) {
    this.#preferences.delete(genre.toLowerCase())
  }

  addToHistory(music) {
    this.#history.push({
      music: music,
      timestamp: new Date(),
    })
    music.increasePopularity()
  }

  getPreferences() {
    return [...this.#preferences]
  }

  getHistory() {
    return [...this.#history]
  }

  toJSON() {
    return {
      name: this.#name,
      preferences: this.getPreferences(),
      history: this.#history.map((h) => ({
        music: h.music.toJSON(),
        timestamp: h.timestamp,
      })),
    }
  }
}

module.exports = User
