// src/index.js
import express from "express";
import dotenv from "dotenv";
import pool from "./db.js"; // PostgreSQL connection
import recipeRoutes from "./routes/recipes.js"; // Import your recipes routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test DB connection route (optional)
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "✅ Database connected", time: result.rows[0].now });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: "Database not connected" });
  }
});

// Mount recipe routes
app.use("/api/recipes", recipeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
