
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../src/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toNullNumber(val) {
  const num = Number(val);
  return Number.isFinite(num) ? num : null;
}

async function main() {
  try {
    // Ensure table exists
    const schemaPath = path.join(__dirname, "..", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");
    await pool.query(schema);

    // Load JSON (object with "0","1",... keys)
    const jsonPath = path.join(__dirname, "..", "..", "data", "US_recipes.json");
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const obj = JSON.parse(raw);
    const rows = Array.isArray(obj) ? obj : Object.values(obj);

    let inserted = 0;
    for (const r of rows) {
      const cuisine = r.cuisine ?? null;
      const title = r.title ?? null;
      const rating = toNullNumber(r.rating);
      const prep_time = toNullNumber(r.prep_time);
      const cook_time = toNullNumber(r.cook_time);
      const total_time = toNullNumber(r.total_time);
      const description = r.description ?? null;
      const nutrients = r.nutrients ? JSON.stringify(r.nutrients) : JSON.stringify({});
      const serves = r.serves ?? null;

      await pool.query(
        `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves]
      );
      inserted++;
    }

    console.log(`Imported ${inserted} recipes.`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
