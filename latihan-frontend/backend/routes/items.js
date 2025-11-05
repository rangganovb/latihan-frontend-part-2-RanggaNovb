import express from "express";
import { items, getNextItemId } from "../data/db.js";
import { protect } from "../middleware/auth.js";

export const router = express.Router();

router.use(protect);

const DUMMY_IDS = ["101112131415", "101112131416"];

// Endpoint Read All - GET /api/items
router.get("/", (req, res) => {
  const userItems = items.filter(
    (item) => item.userId === req.userId || DUMMY_IDS.includes(item.userId)
  );
  res.json(userItems);
});

// Endpoint Create - POST /api/items
router.post("/", (req, res) => {
  const newItem = { id: getNextItemId(), ...req.body, userId: req.userId };
  items.push(newItem);
  res.status(201).json(newItem);
});

const isOwnerOrDummy = (item, userId) => {
  return item.userId === userId || DUMMY_IDS.includes(item.userId);
};

// Endpoint Update - PUT /api/items/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Data tidak ditemukan." });

  if (!isOwnerOrDummy(items[index], req.userId)) {
    return res
      .status(403)
      .json({ message: "Anda tidak memiiki akses untuk mengedit data ini." });
  }
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// Endpoint Delete - DELETE /api/items/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Data tidak ditemukan." });

  if (!isOwnerOrDummy(items[index], req.userId)) {
    return res
      .status(403)
      .json({ message: "Anda tidak memiliki akses untuk menghapus data ini." });
  }

  items.splice(index, 1);
  res.status(204).send();
});
