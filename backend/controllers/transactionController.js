const pool = require("../db");

// const getTransactions = async (req, res) => {
//   const result = await pool.query(`
//       SELECT
//         t.id,
//         t.user_id,
//         t.meal_type,
//         t.amount,
//         t.status,
//         t.created_at,
//         u.name AS employee_name,
//         u.emp_id
//       FROM transactions t
//       LEFT JOIN users u ON u.id = t.user_id
//       ORDER BY t.created_at DESC
//     `);

//   res.json(result.rows);
// };

const getTransactions = async (req, res) => {
  try {
    const { period = "all", startDate, endDate } = req.query;

    let dateCondition = "";
    let params = [];

    if (startDate && endDate) {
      dateCondition = "WHERE t.created_at::date BETWEEN $1 AND $2";
      params = [startDate, endDate];
    } else if (period === "today") {
      dateCondition = "WHERE t.created_at::date = CURRENT_DATE";
    } else if (period === "week") {
      dateCondition = "WHERE t.created_at::date >= CURRENT_DATE - INTERVAL '6 days'";
    } else if (period === "month") {
      dateCondition = "WHERE t.created_at::date >= CURRENT_DATE - INTERVAL '29 days'";
    }

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
      ${dateCondition}
      ORDER BY t.created_at DESC
    `, params);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
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
