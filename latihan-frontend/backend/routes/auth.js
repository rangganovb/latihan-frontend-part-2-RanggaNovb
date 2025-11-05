import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/db.js";
import { JWT_SECRET } from "../server.js";

export const router = express.Router();

// Endpoint Registrasi - POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email sudah terdaftar." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    ...req.body,
    password: hashedPassword,
  };
  users.push(newUser);

  res.status(201).json({ message: "Registrasi berhasil" });
});

// Endpoint Login - POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, message: "Login berhasil" });
});

// Endpoint Debugging - GET /api/auth/users
router.get("/users", (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});
