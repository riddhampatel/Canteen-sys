const pool = require("../db");

const getUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error getting users:", error);

    res.status(500).json({
      error: "Error getting users",
    });
  }
};

const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      phone,
      role = "Employee",
      permissions = "Meal access",
    } = req.body;

    const lastUser = await pool.query(`
      SELECT emp_id
      FROM users
      WHERE emp_id ~ '^EMP[0-9]+$'
      ORDER BY CAST(SUBSTRING(emp_id FROM 4) AS INTEGER) DESC
      LIMIT 1
    `);

    let empId = "EMP001";

    if (lastUser.rows.length > 0) {
      const lastNumber = parseInt(
        lastUser.rows[0].emp_id.replace("EMP", ""),
        10
      );

      empId = `EMP${String(lastNumber + 1).padStart(3, "0")}`;
    }

    const result = await pool.query(
      `INSERT INTO users
        (
          emp_id,
          name,
          email,
          department,
          phone,
          role,
          permissions,
          fingerprint_synced
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, false)
        RETURNING *`,
      [
        empId,
        name,
        email,
        department,
        phone || null,
        role,
        permissions,
      ]
    );

    res.status(201).json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding user:", error);

    res.status(500).json({
      error: "Error adding user",
    });
  }
};

const toggleSync = async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE users
       SET fingerprint_synced = NOT fingerprint_synced
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error toggling fingerprint sync:", error);

    res.status(500).json({
      error: "Error updating fingerprint sync",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  toggleSync,
};
