const topfyManager = new TopfyManager()

class TopfyApp {
  constructor() {
    this.manager = topfyManager
    this.currentView = "dashboard"
    this.initializeElements()
    this.attachEventListeners()
    this.initializeSampleData()
  }

  initializeElements() {
    // Auth elements
    this.authSection = document.getElementById("authSection")
    this.dashboardSection = document.getElementById("dashboardSection")
    this.authForm = document.getElementById("authForm")
    this.authMessage = document.getElementById("authMessage")
    this.loginBtn = document.getElementById("loginBtn")
    this.registerBtn = document.getElementById("registerBtn")

    // Dashboard elements
    this.logoutBtn = document.getElementById("logoutBtn")
    this.currentUserSpan = document.getElementById("currentUser")
    this.pageTitle = document.getElementById("pageTitle")

    // Navigation
    this.navItems = document.querySelectorAll(".nav-item")

    // View elements
    this.views = document.querySelectorAll(".view")
    this.dashboardView = document.getElementById("dashboardView")
    this.libraryView = document.getElementById("libraryView")
    this.recommendationsView = document.getElementById("recommendationsView")
    this.historyView = document.getElementById("historyView")
    this.preferencesView = document.getElementById("preferencesView")

    // Stats
    this.totalSongs = document.getElementById("totalSongs")
    this.playedSongs = document.getElementById("playedSongs")
    this.totalGenres = document.getElementById("totalGenres")
    this.topGenre = document.getElementById("topGenre")

    // Music Library
    this.addMusicBtnLibrary = document.getElementById("addMusicBtnLibrary")
    this.addMusicForm = document.getElementById("addMusicForm")
    this.musicForm = document.getElementById("addMusicForm")
    this.musicLibrary = document.getElementById("musicLibrary")
    this.cancelMusicBtn = document.getElementById("cancelMusicBtn")
    this.addMusicBtn = document.getElementById("addMusicBtn")

    // Quick actions
    this.addMusicBtn = document.getElementById("addMusicBtn")
    this.refreshDataBtn = document.getElementById("refreshDataBtn")

    // Recommendations
    this.generateRecommendationsBtn = document.getElementById("generateRecommendationsBtn")
    this.recommendationsList = document.getElementById("recommendationsList")
    this.topRecommendations = document.getElementById("topRecommendations")

    // History
    this.playHistoryList = document.getElementById("playHistoryList")

    // Preferences
    this.genrePreferences = document.getElementById("genrePreferences")
    this.savePreferencesBtn = document.getElementById("savePreferencesBtn")

    // Player Modal
    this.playerModal = document.getElementById("playerModal")
    this.closePlayerBtn = document.getElementById("closePlayerBtn")
    this.playBtn = document.getElementById("playBtn")
    this.playerTitle = document.getElementById("playerTitle")
    this.playerArtist = document.getElementById("playerArtist")
    this.playerGenre = document.getElementById("playerGenre")
    this.currentTrack = null
  }

  attachEventListeners() {
    // Auth
    this.loginBtn.addEventListener("click", () => this.handleLogin())
    this.registerBtn.addEventListener("click", () => this.handleRegister())
    this.logoutBtn.addEventListener("click", () => this.handleLogout())

    // Navigation
    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => this.switchView(e.currentTarget.dataset.view))
    })

    // Quick actions
    if (this.addMusicBtn) {
      this.addMusicBtn.addEventListener("click", () => this.toggleMusicForm())
    }
    if (this.refreshDataBtn) {
      this.refreshDataBtn.addEventListener("click", () => this.updateDashboard())
    }

    // Music Library
    this.addMusicBtnLibrary.addEventListener("click", () => {
      this.musicForm.classList.toggle("active")
    })
    this.musicForm.addEventListener("submit", (e) => this.handleAddMusic(e))
    this.cancelMusicBtn.addEventListener("click", () => {
      this.musicForm.classList.remove("active")
    })

    // Recommendations
    this.generateRecommendationsBtn.addEventListener("click", () => this.loadRecommendations())

    // Preferences
    this.savePreferencesBtn.addEventListener("click", () => this.savePreferences())

    // Player Modal
    this.closePlayerBtn.addEventListener("click", () => this.closePlayerModal())
    this.playBtn.addEventListener("click", () => this.playCurrentTrack())
  }

  initializeSampleData() {
    const sampleMusics = [
      { title: "Blinding Lights", artist: "The Weeknd", genre: "Electronic" },
      { title: "Levitating", artist: "Dua Lipa", genre: "Pop" },
      { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock" },
      { title: "Piano Man", artist: "Billy Joel", genre: "Classical" },
      { title: "Lose Yourself", artist: "Eminem", genre: "Hip-Hop" },
      { title: "Uptown Funk", artist: "Mark Ronson", genre: "Pop" },
      { title: "Take Five", artist: "Dave Brubeck", genre: "Jazz" },
    ]

    sampleMusics.forEach((music, index) => {
      try {
        this.manager.addMusic(music.title, music.artist, music.genre)
      } catch (error) {
        console.error("[v0] Error adding sample music:", error)
      }
    })
  }

  async handleLogin() {
    const username = document.getElementById("authUsername").value
    const password = document.getElementById("authPassword").value

    if (!username || !password) {
      this.showMessage("Please fill all fields", "error")
      return
    }

    try {
      await this.manager.login(username, password)
      this.showMessage("Login successful!", "success")
      setTimeout(() => this.showDashboard(), 1000)
    } catch (error) {
      this.showMessage("Login failed. Please try again.", "error")
    }
  }

  async handleRegister() {
    const username = document.getElementById("authUsername").value
    const email = document.getElementById("authEmail").value
    const password = document.getElementById("authPassword").value

    if (!username || !email || !password) {
      this.showMessage("Please fill all fields", "error")
      return
    }

    try {
      await this.manager.register(username, email, password)
      this.showMessage("Registration successful! Please login.", "success")
      document.getElementById("authUsername").value = ""
      document.getElementById("authEmail").value = ""
      document.getElementById("authPassword").value = ""
    } catch (error) {
      this.showMessage("Registration failed. Try another username.", "error")
    }
  }

  handleLogout() {
    this.authSection.classList.remove("hidden")
    this.dashboardSection.classList.add("hidden")
    document.getElementById("authUsername").value = ""
    document.getElementById("authEmail").value = ""
    document.getElementById("authPassword").value = ""
    this.showMessage("", "")
  }

  showDashboard() {
    this.authSection.classList.add("hidden")
    this.dashboardSection.classList.remove("hidden")
    const user = this.manager.getCurrentUser()
    if (user) {
      this.currentUserSpan.textContent = user.username
    }
    this.updateDashboard()
  }

  switchView(viewName) {
    this.currentView = viewName

    this.navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.dataset.view === viewName) {
        item.classList.add("active")
      }
    })

    this.views.forEach((view) => view.classList.remove("active"))

    const viewMap = {
      dashboard: this.dashboardView,
      library: this.libraryView,
      recommendations: this.recommendationsView,
      history: this.historyView,
      preferences: this.preferencesView,
    }

    const view = viewMap[viewName]
    if (view) {
      view.classList.add("active")
    }

    const titleMap = {
      dashboard: "Dashboard",
      library: "Music Library",
      recommendations: "Recommendations",
      history: "Play History",
      preferences: "Genre Preferences",
    }

    this.pageTitle.textContent = titleMap[viewName]

    if (viewName === "library") {
      this.loadMusicLibrary()
    } else if (viewName === "history") {
      this.loadPlayHistory()
    } else if (viewName === "preferences") {
      this.loadPreferences()
    } else if (viewName === "recommendations") {
      this.loadRecommendations()
    }
  }

  updateDashboard() {
    const stats = this.manager.getLibraryStats()
    this.totalSongs.textContent = stats.totalTracks
    this.playedSongs.textContent = stats.playedTracks
    this.totalGenres.textContent = stats.totalGenres
    this.topGenre.textContent = stats.topGenre

    this.loadTopRecommendations()
  }

  loadTopRecommendations() {
    try {
      const recommendations = this.manager.getRecommendations(4)
      this.topRecommendations.innerHTML =
        recommendations.length > 0
          ? recommendations.map((track) => this.createTrackCard(track, true)).join("")
          : '<p class="placeholder">No recommendations available yet. Add preferences!</p>'
    } catch (error) {
      console.error("[v0] Load recommendations error:", error)
    }
  }

  async handleAddMusic(e) {
    e.preventDefault()

    const title = document.getElementById("musicTitle").value
    const artist = document.getElementById("musicArtist").value
    const genre = document.getElementById("musicGenre").value

    if (!title || !artist || !genre) {
      this.showMessage("Please fill all fields", "error")
      return
    }

    try {
      await this.manager.addMusic(title, artist, genre)
      this.showMessage("Music added successfully!", "success")
      this.musicForm.reset()
      this.musicForm.classList.remove("active")
      this.loadMusicLibrary()
      this.updateDashboard()
    } catch (error) {
      this.showMessage("Failed to add music", "error")
    }
  }

  loadMusicLibrary() {
    const tracks = this.manager.getAllTracks()
    this.musicLibrary.innerHTML =
      tracks.length > 0
        ? tracks.map((track) => this.createTrackCard(track, false)).join("")
        : '<p class="placeholder">No music in library yet. Add some!</p>'
  }

  createTrackCard(track, isRecommendation = false) {
    return `
            <div class="music-card">
                <div class="music-card-title">${track.title}</div>
                <div class="music-card-artist">${track.artist}</div>
                <div class="music-card-meta">
                    <span class="genre-tag">${track.genre}</span>
                    <span class="popularity-badge">Plays: ${track.popularity}</span>
                </div>
                <div class="music-card-actions">
                    <button class="btn btn-primary btn-small" onclick="app.openPlayerModal('${track.id}')">Play</button>
                    ${!isRecommendation ? `<button class="btn btn-secondary btn-small" onclick="app.removeTrack('${track.id}')">Remove</button>` : ""}
                </div>
            </div>
        `
  }

  openPlayerModal(trackId) {
    const track = this.manager.getAllTracks().find((t) => t.id == trackId)
    if (track) {
      this.currentTrack = track
      this.playerTitle.textContent = track.title
      this.playerArtist.textContent = track.artist
      this.playerGenre.textContent = track.genre
      this.playerModal.classList.add("active")
    }
  }

  closePlayerModal() {
    this.playerModal.classList.remove("active")
    this.currentTrack = null
  }

  async playCurrentTrack() {
    if (!this.currentTrack) return

    try {
      await this.manager.playMusic(this.currentTrack.id)
      this.showMessage(`Now playing: ${this.currentTrack.title}`, "success")
      this.closePlayerModal()
      this.loadPlayHistory()
      this.updateDashboard()
    } catch (error) {
      this.showMessage("Failed to play track", "error")
    }
  }

  loadRecommendations() {
    try {
      const recommendations = this.manager.getRecommendations(10)
      this.recommendationsList.innerHTML =
        recommendations.length > 0
          ? recommendations.map((track) => this.createTrackCard(track, true)).join("")
          : '<p class="placeholder">No recommendations available. Set your preferences!</p>'
    } catch (error) {
      console.error("[v0] Load recommendations error:", error)
    }
  }

  loadPlayHistory() {
    const history = this.manager.getPlayHistory()
    this.playHistoryList.innerHTML =
      history.length > 0
        ? history
            .map(
              (item, index) => `
                <div class="history-item">
                    <div class="history-item-info">
                        <h3>${item.track.title}</h3>
                        <p>${item.track.artist} - ${item.track.genre}</p>
                    </div>
                    <div class="history-time">${new Date(item.timestamp).toLocaleString()}</div>
                </div>
            `,
            )
            .join("")
        : '<p class="placeholder">No playback history yet</p>'
  }

  loadPreferences() {
    const genres = this.manager.getAllGenres()
    const userPreferences = this.manager.getUserPreferences()

    this.genrePreferences.innerHTML = genres
      .map(
        (genre) => `
            <button class="genre-btn ${userPreferences.includes(genre) ? "selected" : ""}" 
                    onclick="app.toggleGenrePreference('${genre}')">
                ${genre}
            </button>
        `,
      )
      .join("")
  }

  toggleGenrePreference(genre) {
    const preferences = this.manager.getUserPreferences()
    if (preferences.includes(genre)) {
      this.manager.removeGenrePreference(genre)
    } else {
      this.manager.addGenrePreference(genre)
    }
    this.loadPreferences()
  }

  savePreferences() {
    this.showMessage("Preferences saved successfully!", "success")
    setTimeout(() => this.loadRecommendations(), 500)
  }

  toggleMusicForm() {
    this.musicForm.classList.toggle("active")
  }

  removeTrack(trackId) {
    console.warn("Remove functionality would require database integration")
    this.showMessage("Track removal requires backend integration", "error")
  }

  showMessage(text, type) {
    if (!text) {
      this.authMessage.classList.add("hidden")
      return
    }
    this.authMessage.textContent = text
    this.authMessage.className = `message ${type}`
  }
}
