const pool = require("../config/db");

async function findByEmail(email) {
  const sql = `
    SELECT id, name, email, password_hash, is_active
    FROM users
    WHERE email = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [email]);
  return rows[0] || null;
}

async function findById(id) {
  const sql = `
    SELECT id, name, email, role, is_active, created_at, updated_at
    FROM users
    WHERE id = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

module.exports = {
  findByEmail,
  findById
};
