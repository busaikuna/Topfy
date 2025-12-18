const express = require("express")
const { Music, SponsoredMusic, MusicLibrary, Listener, Administrator, Recommender, AuthSystem } = require("./models")
const { renderHTML } = require("./views")

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Inicialização do Sistema
const library = new MusicLibrary()
const authSystem = new AuthSystem()
const recommender = new Recommender(library)

// Usuários padrão
const admin = new Administrator("Admin", "admin@topfy.com", "admin123")
const listener1 = new Listener("João Silva", "joao@email.com", "123456")

authSystem.registerUser(admin)
authSystem.registerUser(listener1)

// Adicionar preferências ao listener
listener1.addPreference("Pop")
listener1.addPreference("Rock")

// ===== MAIS MÚSICAS =====

library.addMusic(new Music(31, "Lose Yourself", "Eminem", "Rap", "5:26", 2800))
library.addMusic(new Music(32, "Numb", "Linkin Park", "Rock", "3:07", 2600))
library.addMusic(new SponsoredMusic(33, "Shallow", "Lady Gaga & Bradley Cooper", "Pop", "Spotify Premium", "3:36", 2100))
library.addMusic(new Music(34, "Hallelujah", "Jeff Buckley", "Soul", "6:53", 2400))
library.addMusic(new Music(35, "Californication", "Red Hot Chili Peppers", "Rock", "5:29", 2300))
library.addMusic(new Music(36, "Bad Romance", "Lady Gaga", "Pop", "4:54", 2500))
library.addMusic(new SponsoredMusic(37, "Blinding Lights (Remix)", "The Weeknd", "Pop", "Apple Music", "3:22", 1900))
library.addMusic(new Music(38, "Fix You", "Coldplay", "Soul", "4:55", 2450))
library.addMusic(new Music(39, "Seven Nation Army", "The White Stripes", "Rock", "3:52", 2550))
library.addMusic(new Music(40, "Poker Face", "Lady Gaga", "Pop", "3:58", 2350))

library.addMusic(new Music(41, "My Immortal", "Evanescence", "Rock", "4:24", 2200))
library.addMusic(new SponsoredMusic(42, "Thinking Out Loud", "Ed Sheeran", "Pop", "YouTube Music", "4:41", 2600))
library.addMusic(new Music(43, "Dream On", "Aerosmith", "Rock", "4:26", 2750))
library.addMusic(new Music(44, "Stand by Me", "Ben E. King", "Soul", "2:55", 2900))
library.addMusic(new Music(45, "Viva La Vida", "Coldplay", "Pop", "4:02", 2700))
library.addMusic(new SponsoredMusic(46, "Senorita", "Shawn Mendes & Camila Cabello", "Pop", "Spotify Premium", "3:11", 2000))
library.addMusic(new Music(47, "Come As You Are", "Nirvana", "Rock", "3:38", 2400))
library.addMusic(new Music(48, "Ain't No Sunshine", "Bill Withers", "Soul", "2:04", 2650))
library.addMusic(new Music(49, "Radioactive", "Imagine Dragons", "Rock", "3:06", 2150))
library.addMusic(new Music(50, "Counting Stars", "OneRepublic", "Pop", "4:17", 2550))

library.addMusic(new Music(51, "Wonderwall", "Oasis", "Rock", "4:18", 3000))
library.addMusic(new SponsoredMusic(52, "Heat Waves", "Glass Animals", "Pop", "Amazon Music", "3:59", 2300))
library.addMusic(new Music(53, "I Will Always Love You", "Whitney Houston", "Soul", "4:31", 3200))
library.addMusic(new Music(54, "Boulevard of Broken Dreams", "Green Day", "Rock", "4:20", 2600))
library.addMusic(new Music(55, "Can't Stop the Feeling!", "Justin Timberlake", "Pop", "3:56", 2800))
library.addMusic(new SponsoredMusic(56, "Drivers License", "Olivia Rodrigo", "Pop", "Apple Music", "4:02", 2400))
library.addMusic(new Music(57, "Zombie", "The Cranberries", "Rock", "5:06", 2500))
library.addMusic(new Music(58, "Lean On Me", "Bill Withers", "Soul", "4:18", 2950))
library.addMusic(new Music(59, "Demons", "Imagine Dragons", "Rock", "2:57", 2250))
library.addMusic(new Music(60, "Roar", "Katy Perry", "Pop", "3:43", 2700))

library.addMusic(new Music(61, "Nothing Else Matters", "Metallica", "Rock", "6:28", 3100))
library.addMusic(new Music(62, "All of Me", "John Legend", "Soul", "4:29", 2900))
library.addMusic(new SponsoredMusic(63, "Anti-Hero", "Taylor Swift", "Pop", "Spotify Premium", "3:21", 2600))
library.addMusic(new Music(64, "Sweet Home Alabama", "Lynyrd Skynyrd", "Rock", "4:45", 2450))
library.addMusic(new Music(65, "Toxic", "Britney Spears", "Pop", "3:19", 2850))
library.addMusic(new Music(66, "Let's Stay Together", "Al Green", "Soul", "3:19", 2750))
library.addMusic(new SponsoredMusic(67, "Levitating (Remix)", "Dua Lipa", "Pop", "Deezer", "3:37", 2300))
library.addMusic(new Music(68, "Black", "Pearl Jam", "Rock", "5:43", 3050))
library.addMusic(new Music(69, "Respect", "Aretha Franklin", "Soul", "2:29", 3300))
library.addMusic(new Music(70, "Shake It Off", "Taylor Swift", "Pop", "3:39", 2950))

// Sessão simples
let currentUser = null

// Rota principal
app.get("/", (req, res) => {
    res.send(renderHTML(currentUser))
})

// API - Autenticação
app.post("/api/login", (req, res) => {
    try {
        const { email, password } = req.body
        const user = authSystem.authenticate(email, password)

        if (user) {
            currentUser = user
            res.json({
                success: true,
                user: user.getProfile(),
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Email ou senha inválidos.",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

app.post("/api/logout", (req, res) => {
    currentUser = null
    res.json({ success: true })
})

// API - Listar músicas
app.get("/api/musics", (req, res) => {
    try {
        const musics = library.getAll()
        res.json({ success: true, musics })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Filtrar por gênero
app.get("/api/musics/genre/:genre", (req, res) => {
    try {
        const { genre } = req.params
        const musics = library.getByGenre(genre)
        res.json({ success: true, musics })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Músicas mais populares
app.get("/api/musics/popular", (req, res) => {
    try {
        const limit = Number.parseInt(req.query.limit) || 10
        const musics = library.getMostPopular(limit)
        res.json({ success: true, musics })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Tocar música (aumenta popularidade - POLIMORFISMO)
app.post("/api/play/:id", (req, res) => {
    try {
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "Usuário não autenticado.",
            })
        }

        const { id } = req.params
        const music = library.findById(Number.parseInt(id))

        if (!music) {
            return res.status(404).json({
                success: false,
                message: "Música não encontrada.",
            })
        }

        // POLIMORFISMO: increasePopularity() tem comportamento diferente
        // para Music (+1) e SponsoredMusic (+2)
        music.increasePopularity()

        if (currentUser instanceof Listener) {
            currentUser.addToHistory(music.getDetails())
        }

        res.json({
            success: true,
            message: "Música tocada!",
            music: music.getDetails(),
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Recomendações personalizadas
app.get("/api/recommendations", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Listener)) {
            return res.status(403).json({
                success: false,
                message: "Apenas ouvintes podem receber recomendações.",
            })
        }

        const limit = Number.parseInt(req.query.limit) || 5
        const recommendations = recommender.recommend(currentUser, limit)

        res.json({
            success: true,
            recommendations,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Adicionar preferência
app.post("/api/preferences", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Listener)) {
            return res.status(403).json({
                success: false,
                message: "Apenas ouvintes podem adicionar preferências.",
            })
        }

        const { genre } = req.body
        currentUser.addPreference(genre)

        res.json({
            success: true,
            message: "Preferência adicionada!",
            preferences: currentUser.getPreferences(),
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Histórico do usuário
app.get("/api/history", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Listener)) {
            return res.status(403).json({
                success: false,
                message: "Apenas ouvintes têm histórico.",
            })
        }

        const history = currentUser.getHistory()
        res.json({ success: true, history })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Adicionar música (Admin)
app.post("/api/musics", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Administrator)) {
            return res.status(403).json({
                success: false,
                message: "Apenas administradores podem adicionar músicas.",
            })
        }

        const { type, id, title, artist, genre, duration, sponsor } = req.body

        let music
        if (type === "SponsoredMusic") {
            music = new SponsoredMusic(
                Number.parseInt(id),
                title,
                artist,
                genre,
                duration,
                sponsor || "Sem patrocinador",
                0
            )
        } else {
            music = new Music(
                Number.parseInt(id),
                title,
                artist,
                genre,
                duration,
                0
            )
        }

        currentUser.addMusic(library, music)

        res.json({
            success: true,
            message: "Música adicionada com sucesso!",
            music: music.getDetails(),
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})


// API - Remover música (Admin)
app.delete("/api/musics/:id", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Administrator)) {
            return res.status(403).json({
                success: false,
                message: "Apenas administradores podem remover músicas.",
            })
        }

        const { id } = req.params
        const removed = currentUser.removeMusic(library, Number.parseInt(id))

        if (removed) {
            res.json({
                success: true,
                message: "Música removida com sucesso!",
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Música não encontrada.",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Estatísticas (Admin)
app.get("/api/statistics", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Administrator)) {
            return res.status(403).json({
                success: false,
                message: "Apenas administradores podem ver estatísticas.",
            })
        }

        const stats = currentUser.getStatistics(library)
        res.json({
            success: true,
            statistics: stats,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// API - Criar novo usuário (Admin)
app.post("/api/users", (req, res) => {
    try {
        const { name, email, password, type } = req.body

        if (!name || !email || !password || !type) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos são obrigatórios.",
            })
        }

        // 🔓 CADASTRO PÚBLICO (Listener)
        if (!currentUser) {
            if (type !== "Listener") {
                return res.status(403).json({
                    success: false,
                    message: "Apenas contas do tipo Listener podem ser criadas publicamente.",
                })
            }
        }
        // 🔒 CADASTRO ADMINISTRATIVO
        else if (!(currentUser instanceof Administrator)) {
            return res.status(403).json({
                success: false,
                message: "Apenas administradores podem criar este tipo de usuário.",
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email inválido.",
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "A senha deve ter pelo menos 6 caracteres.",
            })
        }

        let newUser
        if (type === "Administrator") {
            newUser = new Administrator(name, email, password)
        } else {
            newUser = new Listener(name, email, password)
        }

        authSystem.registerUser(newUser)

        res.json({
            success: true,
            message: "Conta criada com sucesso!",
            user: newUser.getProfile(),
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
})


// API - Listar usuários (Admin)
app.get("/api/users", (req, res) => {
    try {
        if (!currentUser || !(currentUser instanceof Administrator)) {
            return res.status(403).json({
                success: false,
                message: "Apenas administradores podem listar usuários.",
            })
        }

        const users = authSystem.listUsers()
        res.json({
            success: true,
            users,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

app.listen(PORT, () => {
    console.log(` Sistema Topfy rodando em http://localhost:${PORT}`)
})

module.exports = app