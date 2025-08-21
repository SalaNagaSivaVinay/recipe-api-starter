const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Database connection pool
const pool = new Pool({
  user: "postgres",       // PostgreSQL username (default: postgres)
  host: "localhost",      // Running locally
  database: "recipes_db", // Mee database name
  password: "@Vinay12345", // Install appudu ichina password
  port: 5432,             // Default PostgreSQL port
});

// Test DB connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database!"))
  .catch(err => console.error("❌ Connection error", err.stack));

// Example API
app.get("/", (req, res) => {
  res.send("Hello, Recipe App!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
