const pool = require("../db");

const getUsers = async (req, res) => {
  const result = await pool.query(`
      SELECT
        id,
        emp_id,
        name,
        email,
        department,
        phone,
        role,
        permissions,
        fingerprint_synced,
        created_at
      FROM users
      ORDER BY id ASC
    `);

  res.json({
    users: result.rows.map((user) => ({
      ...user,
      initials: user.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    })),
  });
};

const addUser = async (req, res) => {
  const {
    name,
    email,
    department,
    phone,
    role = "Employee",
    permissions = "Meal access",
  } = req.body;

  const lastUser = await pool.query(
    "SELECT emp_id FROM users ORDER BY id DESC LIMIT 1",
  );

  let empId = "EMP001";

  if (lastUser.rows.length > 0) {
    const lastNumber = parseInt(lastUser.rows[0].emp_id.replace("EMP", ""));
    empId = `EMP${String(lastNumber + 1).padStart(3, "0")}`;
  }

  const result = await pool.query(
    `INSERT INTO users
       (emp_id, name, email, department, phone, role, permissions, fingerprint_synced)
       VALUES ($1, $2, $3, $4, $5, $6, $7, false)
       RETURNING *`,
    [empId, name, email, department, phone || null, role, permissions],
  );

  res.status(201).json({
    user: result.rows[0],
  });
};

const toggleSync = async (req, res) => {
  const result = await pool.query(
    `UPDATE users
       SET fingerprint_synced = NOT fingerprint_synced
       WHERE id = $1
       RETURNING *`,
    [req.params.id],
  );

  res.json({
    user: result.rows[0],
  });
};

module.exports = {
  getUsers,
  addUser,
  toggleSync,
};
