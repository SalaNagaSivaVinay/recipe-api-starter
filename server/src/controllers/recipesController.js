
import { pool } from "../db.js";

function parseLimit(limitRaw, def=15) {
  const n = Number(limitRaw);
  if (!Number.isFinite(n)) return def;
  // clamp 15..50 as per requirement
  return Math.min(50, Math.max(15, Math.floor(n)));
}

export async function getAllRecipes(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page ?? "1", 10) || 1);
    const limit = parseLimit(req.query.limit);
    const offset = (page - 1) * limit;

    const totalRes = await pool.query("SELECT COUNT(*)::INT AS count FROM recipes");
    const total = totalRes.rows[0].count;

    const dataRes = await pool.query(
      `SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
       FROM recipes
       ORDER BY rating DESC NULLS LAST, id ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({ page, limit, total, data: dataRes.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Helper: parse operator param like ">=4.5"
function parseOpVal(expr) {
  const m = String(expr).trim().match(/^(<=|>=|=|<|>){0,1}\s*([\d.]+)$/);
  if (!m) return null;
  const op = m[1] || "=";
  const val = m[2];
  return { op, val };
}

export async function searchRecipes(req, res) {
  try {
    let query = `SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
                 FROM recipes WHERE 1=1`;
    const params = [];
    let i = 1;

    if (req.query.title) {
      query += ` AND title ILIKE $${i++}`;
      params.push(`%${req.query.title}%`);
    }

    if (req.query.cuisine) {
      query += ` AND cuisine = $${i++}`;
      params.push(req.query.cuisine);
    }

    if (req.query.rating) {
      const pv = parseOpVal(req.query.rating);
      if (pv) {
        query += ` AND rating ${pv.op} $${i++}`;
        params.push(pv.val);
      }
    }

    if (req.query.total_time) {
      const pv = parseOpVal(req.query.total_time);
      if (pv) {
        query += ` AND total_time ${pv.op} $${i++}`;
        params.push(pv.val);
      }
    }

    if (req.query.calories) {
      // calories are stored like "389 kcal" -> extract digits then cast to int
      const pv = parseOpVal(req.query.calories);
      if (pv) {
        query += ` AND (regexp_replace(nutrients->>'calories', '[^0-9]', '', 'g'))::INT ${pv.op} $${i++}`;
        params.push(pv.val);
      }
    }

    query += " ORDER BY rating DESC NULLS LAST, id ASC";

    const dataRes = await pool.query(query, params);
    res.json({ data: dataRes.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
