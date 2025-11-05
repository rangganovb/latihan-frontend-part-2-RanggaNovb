import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../server.js";

// Middleware untuk mengecek validitas token JWT dari header Authorization
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Buat userId ke objek request
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Token tidak valid. Harap login ulang" });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Tidak dapat mengakses. Token hilang atau format tidak valid",
    });
  }
};
