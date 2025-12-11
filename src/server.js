const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const musicRoutes = require("./routes/musicRoutes");
const playRoutes = require("./routes/playRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/music", musicRoutes);
app.use("/play", playRoutes);

app.listen(3000, () => {
  console.log("Topfy backend running on http://localhost:3000");
});
