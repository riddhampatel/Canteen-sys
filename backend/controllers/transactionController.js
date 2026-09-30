const pool = require("../db");

const getTransactions = async (req, res) => {
  const result = await pool.query(`
      SELECT
        t.id,
        t.user_id,
        t.meal_type,
        t.amount,
        t.status,
        t.created_at,
        u.name AS employee_name,
        u.emp_id
      FROM transactions t
      LEFT JOIN users u ON u.id = t.user_id
      ORDER BY t.created_at DESC
    `);

  res.json(result.rows);
};

const createTransaction = async (req, res) => {
  const { user_id, meal_type, amount, status = "Completed" } = req.body;

  const result = await pool.query(
    `INSERT INTO transactions (user_id, meal_type, amount, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
    [user_id, meal_type, amount, status],
  );

  res.json(result.rows[0]);
};

module.exports = { getTransactions, createTransaction };
