const topfy = require("./topfyInstance")

exports.loginForm = (req, res) => {
  if (req.session.user) {
    return res.redirect("/user/dashboard")
  }

  res.render("login", {
    title: "Login",
  })
}

exports.login = (req, res) => {
  const { username } = req.body

  if (!username) {
    return res.redirect("/user/login")
  }

  const user = topfy.createUser(username)
  req.session.user = username

  res.redirect("/user/dashboard")
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/")
}

exports.dashboard = (req, res) => {
  const username = req.session.user

  if (!username) {
    return res.redirect("/user/login")
  }

  const user = topfy.getUser(username)
  const recommendations = topfy.getRecommendations(username, 10)
  const history = user.getHistory().reverse().slice(0, 20)

  res.render("dashboard", {
    title: "Dashboard",
    user: user,
    recommendations: recommendations,
    history: history,
  })
}

exports.preferences = (req, res) => {
  const username = req.session.user

  if (!username) {
    return res.redirect("/user/login")
  }

  const user = topfy.getUser(username)
  const allMusic = topfy.getLibrary().getAll()
  const allGenres = [...new Set(allMusic.map((m) => m.genre))]

  res.render("preferences", {
    title: "Preferences",
    user: user,
    allGenres: allGenres,
  })
}

exports.addPreference = (req, res) => {
  const username = req.session.user
  const { genre } = req.body

  if (!username || !genre) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const user = topfy.getUser(username)
  user.addPreference(genre)

  res.json({ success: true, preferences: user.getPreferences() })
}

exports.removePreference = (req, res) => {
  const username = req.session.user
  const { genre } = req.body

  if (!username || !genre) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const user = topfy.getUser(username)
  user.removePreference(genre)

  res.json({ success: true, preferences: user.getPreferences() })
}

exports.history = (req, res) => {
  const username = req.session.user

  if (!username) {
    return res.redirect("/user/login")
  }

  const user = topfy.getUser(username)
  const history = user.getHistory().reverse()

  res.render("history", {
    title: "Listening History",
    history: history,
  })
}
