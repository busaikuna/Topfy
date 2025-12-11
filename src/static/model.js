const API_URL = "http://localhost:3000"

class AudioTrack {
  #id
  #title
  #artist
  #genre
  #popularity

  constructor(id, title, artist, genre, popularity = 0) {
    this.#id = id
    this.#title = title
    this.#artist = artist
    this.#genre = genre
    this.#popularity = popularity
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
    }
  }
}

class MusicLibraryManager {
  #tracks = []

  addTrack(track) {
    if (!this.#tracks.find((t) => t.id === track.id)) {
      this.#tracks.push(track)
      return true
    }
    return false
  }

  getAllTracks() {
    return [...this.#tracks]
  }

  getTracksByGenre(genre) {
    return this.#tracks.filter((t) => t.genre === genre)
  }

  getMostPopularTracks(limit = 5) {
    return [...this.#tracks].sort((a, b) => b.popularity - a.popularity).slice(0, limit)
  }

  getTrackById(id) {
    return this.#tracks.find((t) => t.id === id)
  }

  getAllGenres() {
    const genres = new Set(this.#tracks.map((t) => t.genre))
    return Array.from(genres)
  }
}

class UserProfile {
  #userId
  #username
  #email
  #preferences = new Set()
  #playHistory = []

  constructor(userId, username, email) {
    this.#userId = userId
    this.#username = username
    this.#email = email
  }

  get userId() {
    return this.#userId
  }
  get username() {
    return this.#username
  }
  get email() {
    return this.#email
  }

  addGenrePreference(genre) {
    this.#preferences.add(genre)
  }

  removeGenrePreference(genre) {
    this.#preferences.delete(genre)
  }

  getPreferences() {
    return Array.from(this.#preferences)
  }

  addToHistory(track) {
    this.#playHistory.push({
      track: track,
      timestamp: new Date(),
    })
    track.increasePopularity()
  }

  getPlayHistory() {
    return [...this.#playHistory]
  }

  clearPreferences() {
    this.#preferences.clear()
  }
}

class RecommendationEngine {
  #library

  constructor(library) {
    this.#library = library
  }

  generateRecommendations(userProfile, limit = 5) {
    const preferences = userProfile.getPreferences()

    if (preferences.length === 0) {
      return this.#library.getMostPopularTracks(limit)
    }

    const recommendedTracks = this.#library.getAllTracks().filter((track) => preferences.includes(track.genre))

    if (recommendedTracks.length === 0) {
      return this.#library.getMostPopularTracks(limit)
    }

    return recommendedTracks.sort((a, b) => b.popularity - a.popularity).slice(0, limit)
  }
}

class TopfyManager {
  #library
  #currentUser = null
  #recommendationEngine
  #nextTrackId = 1

  constructor() {
    this.#library = new MusicLibraryManager()
    this.#recommendationEngine = new RecommendationEngine(this.#library)
  }

  async register(username, email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Register error:", error)
      throw error
    }
  }

  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      this.#currentUser = new UserProfile(data.userId, username, data.email)
      return data
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  async addMusic(title, artist, genre) {
    try {
      const track = new AudioTrack(this.#nextTrackId++, title, artist, genre)

      this.#library.addTrack(track)

      const response = await fetch(`${API_URL}/music`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(track.toJSON()),
      })

      if (!response.ok) {
        throw new Error("Failed to add music")
      }

      return track
    } catch (error) {
      console.error("[v0] Add music error:", error)
      throw error
    }
  }

  async playMusic(trackId) {
    const track = this.#library.getTrackById(trackId)
    if (!track) {
      throw new Error("Track not found")
    }

    if (!this.#currentUser) {
      throw new Error("No user logged in")
    }

    this.#currentUser.addToHistory(track)

    try {
      await fetch(`${API_URL}/play`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: this.#currentUser.userId,
          trackId: trackId,
        }),
      })
    } catch (error) {
      console.error("[v0] Play music error:", error)
    }

    return track
  }

  addGenrePreference(genre) {
    if (!this.#currentUser) {
      throw new Error("No user logged in")
    }
    this.#currentUser.addGenrePreference(genre)
  }

  removeGenrePreference(genre) {
    if (!this.#currentUser) {
      throw new Error("No user logged in")
    }
    this.#currentUser.removeGenrePreference(genre)
  }

  getRecommendations(limit = 5) {
    if (!this.#currentUser) {
      throw new Error("No user logged in")
    }
    return this.#recommendationEngine.generateRecommendations(this.#currentUser, limit)
  }

  getCurrentUser() {
    return this.#currentUser
  }

  getLibraryStats() {
    const tracks = this.#library.getAllTracks()
    const genres = this.#library.getAllGenres()
    const history = this.#currentUser ? this.#currentUser.getPlayHistory() : []

    return {
      totalTracks: tracks.length,
      totalGenres: genres.length,
      playedTracks: history.length,
      topGenre: this.getTopGenre(),
    }
  }

  getTopGenre() {
    if (!this.#currentUser) return "-"

    const preferences = this.#currentUser.getPreferences()
    const history = this.#currentUser.getPlayHistory()

    if (history.length === 0) return preferences[0] || "-"

    const genreCount = {}
    history.forEach((item) => {
      const genre = item.track.genre
      genreCount[genre] = (genreCount[genre] || 0) + 1
    })

    return Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"
  }

  getAllTracks() {
    return this.#library.getAllTracks()
  }

  getAllGenres() {
    return this.#library.getAllGenres()
  }

  getPlayHistory() {
    if (!this.#currentUser) return []
    return this.#currentUser.getPlayHistory()
  }

  getUserPreferences() {
    if (!this.#currentUser) return []
    return this.#currentUser.getPreferences()
  }

  clearUserPreferences() {
    if (!this.#currentUser) return
    this.#currentUser.clearPreferences()
  }
}

const topfyManager = new TopfyManager()