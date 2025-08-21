// src/routes/recipes.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// ✅ Get all recipes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recipes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    const result = await pool.query(
      "INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *",
      [title, ingredients, instructions]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update recipe by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions } = req.body;

    const result = await pool.query(
      "UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *",
      [title, ingredients, instructions, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
