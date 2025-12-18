// ===============================
// CLASSES ABSTRATAS (ABSTRAÇÃO)
// ===============================
class AbstractMusic {
  #popularity

  constructor(id, title, artist, genre, duration, popularity = 0) {
    if (new.target === AbstractMusic) {
      throw new Error("AbstractMusic não pode ser instanciada.")
    }
    this.id = id
    this.title = title
    this.artist = artist
    this.genre = genre
    this.duration = duration
    this.#popularity = popularity
  }

  get popularity() {
    return this.#popularity
  }

  set popularity(value) {
    if (value < 0) throw new Error("Popularidade não pode ser negativa.")
    this.#popularity = value
  }

  increasePopularity() {
    throw new Error("Método increasePopularity deve ser implementado.")
  }

  getDetails() {
    return {
      id: this.id,
      title: this.title,
      artist: this.artist,
      genre: this.genre,
      duration: this.duration,
      popularity: this.#popularity,
    }
  }
}

class AbstractUser {
  #name
  #email
  #password

  constructor(name, email, password) {
    if (new.target === AbstractUser) {
      throw new Error("AbstractUser não pode ser instanciada.")
    }
    this.#name = name
    this.#email = email
    this.#password = password
  }

  get name() {
    return this.#name
  }
  get email() {
    return this.#email
  }
  get password() {
    return this.#password
  }

  validatePassword(password) {
    return this.#password === password
  }

  getProfile() {
    return {
      name: this.#name,
      email: this.#email,
    }
  }
}

// ===============================
// IMPLEMENTAÇÕES CONCRETAS
// ===============================

// POLIMORFISMO: Música normal
class Music extends AbstractMusic {
  #popularity

  constructor(id, title, artist, genre, duration, popularity = 0) {
    super(id, title, artist, genre, duration, popularity)
    this.#popularity = popularity
  }

  get popularity() {
    return this.#popularity
  }

  // Aumenta popularidade em 1
  increasePopularity() {
    this.#popularity += 1
  }

  getDetails() {
    return {
      ...super.getDetails(),
      type: "Music",
      popularity: this.#popularity,
    }
  }
}

// POLIMORFISMO: Música patrocinada (comportamento diferente)
class SponsoredMusic extends AbstractMusic {
  #popularity
  #sponsor

  constructor(id, title, artist, genre, duration, sponsor, popularity = 0) {
    super(id, title, artist, genre, duration, popularity)
    this.#popularity = popularity
    this.#sponsor = sponsor
  }

  get popularity() {
    return this.#popularity
  }

  get sponsor() {
    return this.#sponsor
  }

  // Aumenta popularidade em 2 (comportamento diferente)
  increasePopularity() {
    this.#popularity += 2
  }

  getDetails() {
    return {
      ...super.getDetails(),
      type: "SponsoredMusic",
      popularity: this.#popularity,
      sponsor: this.#sponsor,
    }
  }
}

// ===============================
// BIBLIOTECA DE MÚSICAS
// ===============================
class MusicLibrary {
  #musics = []

  addMusic(music) {
    this.#musics.push(music)
  }

  removeMusic(id) {
    const index = this.#musics.findIndex((m) => m.id === id)
    if (index !== -1) {
      this.#musics.splice(index, 1)
      return true
    }
    return false
  }

  getAll() {
    return this.#musics.map((m) => m.getDetails())
  }

  getByGenre(genre) {
    return this.#musics.filter((m) => m.genre === genre).map((m) => m.getDetails())
  }

  getMostPopular(limit = 10) {
    return [...this.#musics]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
      .map((m) => m.getDetails())
  }

  findById(id) {
    return this.#musics.find((m) => m.id === id)
  }

  getTotalMusics() {
    return this.#musics.length
  }

  getTotalPlays() {
    return this.#musics.reduce((sum, m) => sum + m.popularity, 0)
  }
}

// ===============================
// USUÁRIO LISTENER
// ===============================
class Listener extends AbstractUser {
  #preferences = new Set()
  #history = []
  #playlists = []

  constructor(name, email, password) {
    super(name, email, password)
  }

  addPreference(genre) {
    this.#preferences.add(genre)
  }

  getPreferences() {
    return [...this.#preferences]
  }

  addToHistory(music) {
    this.#history.push({
      ...music,
      playedAt: new Date().toISOString(),
    })
  }

  getHistory() {
    return [...this.#history]
  }

  createPlaylist(name) {
    this.#playlists.push({
      id: Date.now(),
      name,
      musics: [],
      createdAt: new Date().toISOString(),
    })
  }

  getPlaylists() {
    return [...this.#playlists]
  }

  getProfile() {
    return {
      ...super.getProfile(),
      type: "Listener",
      preferences: this.getPreferences(),
      historyCount: this.#history.length,
      playlistsCount: this.#playlists.length,
    }
  }
}

// ===============================
// USUÁRIO ADMINISTRADOR
// ===============================
class Administrator extends AbstractUser {
  constructor(name, email, password) {
    super(name, email, password)
  }

  addMusic(library, music) {
    library.addMusic(music)
  }

  removeMusic(library, id) {
    return library.removeMusic(id)
  }

  getStatistics(library) {
    return {
      totalMusics: library.getTotalMusics(),
      totalPlays: library.getTotalPlays(),
      topGenres: this.getTopGenres(library),
    }
  }

  getTopGenres(library) {
    const musics = library.getAll()
    const genreCounts = {}
    musics.forEach((m) => {
      genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1
    })
    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([genre, count]) => ({ genre, count }))
  }

  getProfile() {
    return {
      ...super.getProfile(),
      type: "Administrator",
    }
  }
}

// ===============================
// SISTEMA DE RECOMENDAÇÃO
// ===============================
class Recommender {
  constructor(library) {
    this.library = library
  }

  recommend(user, limit = 5) {
    const preferences = user.getPreferences()

    if (preferences.length === 0) {
      return this.library.getMostPopular(limit)
    }

    const allMusics = this.library.getAll()
    const preferredMusics = allMusics.filter((m) => preferences.includes(m.genre))

    if (preferredMusics.length === 0) {
      return this.library.getMostPopular(limit)
    }

    return preferredMusics.sort((a, b) => b.popularity - a.popularity).slice(0, limit)
  }

  getTopByGenre(genre, limit = 10) {
    return this.library
      .getByGenre(genre)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
  }
}

// ===============================
// SISTEMA DE AUTENTICAÇÃO
// ===============================
class AuthSystem {
  #users = []

  registerUser(user) {
    const exists = this.#users.find((u) => u.email === user.email)
    if (exists) {
      throw new Error("Email já cadastrado.")
    }
    this.#users.push(user)
  }

  authenticate(email, password) {
    const user = this.#users.find((u) => u.email === email)
    if (user && user.validatePassword(password)) {
      return user
    }
    return null
  }

  listUsers() {
    return this.#users.map((u) => u.getProfile())
  }
}

module.exports = {
  AbstractMusic,
  AbstractUser,
  Music,
  SponsoredMusic,
  MusicLibrary,
  Listener,
  Administrator,
  Recommender,
  AuthSystem,
}