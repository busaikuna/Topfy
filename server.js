const express = require("express")
const path = require("path")
const session = require("express-session")

const musicRoutes = require("./routes/musicRoutes")
const userRoutes = require("./routes/userRoutes")
const homeRoutes = require("./routes/homeRoutes")

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: "topfy-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
)

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null
  next()
})

app.use("/", homeRoutes)
app.use("/user", userRoutes)
app.use("/music", musicRoutes)

app.listen(PORT, () => {
  console.log(`TOPFY running on http://localhost:${PORT}`)
})
