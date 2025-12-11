const db = require("../models/database.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let nextUserId = 1;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User(nextUserId++, username, email, passwordHash);
  db.users.push(newUser);

  return res.json({
    message: "User registered successfully"
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  return res.json({
    message: "Login successful",
    userId: user.id,
    email: user.email
  });
};
