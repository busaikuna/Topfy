const MusicLibrary = require("./MusicLibrary")
const Recommender = require("./Recommender")
const User = require("./User")

class Topfy {
  #library
  #users
  #recommender

  constructor() {
    this.#library = new MusicLibrary()
    this.#users = {}
    this.#recommender = new Recommender(this.#library)
  }

  createUser(name) {
    if (this.#users[name]) {
      return this.#users[name]
    }
    const user = new User(name)
    this.#users[name] = user
    return user
  }

  getUser(name) {
    return this.#users[name] || null
  }

  getAllUsers() {
    return Object.values(this.#users)
  }

  addMusic(music) {
    this.#library.addMusic(music)
  }

  getLibrary() {
    return this.#library
  }

  playMusic(userName, musicId) {
    const user = this.#users[userName]
    const music = this.#library.getById(musicId)

    if (user && music) {
      user.addToHistory(music)
      return true
    }
    return false
  }

  getRecommendations(userName, limit = 10) {
    const user = this.#users[userName]
    if (!user) return []
    return this.#recommender.recommend(user, limit)
  }

  searchMusic(query) {
    return this.#library.search(query)
  }

  getMostPopular(limit = 10) {
    return this.#library.getMostPopular(limit)
  }
}

module.exports = Topfy
