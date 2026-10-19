const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const menuRoutes = require("./routes/menuRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Canteen Management Backend is running");
});

// API routes
app.use("/api/menu", menuRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

// Dashboard Stats with Today / Week / Month filters
app.get("/api/dash/stats", async (req, res) => {
  try {
    const { period = "today", startDate, endDate } = req.query;

    let dateFilter = "t.created_at::date = CURRENT_DATE";
    let menuDateFilter = "date = CURRENT_DATE";
    let filterParams = [];

    if (startDate && endDate) {
      dateFilter = "t.created_at::date BETWEEN $1 AND $2";
      menuDateFilter = "date BETWEEN $1 AND $2";
      filterParams = [startDate, endDate];
    } else if (period === "week") {
      dateFilter = `
        t.created_at::date >= CURRENT_DATE - INTERVAL '6 days'
        AND t.created_at::date <= CURRENT_DATE
      `;

      menuDateFilter = `
        date >= CURRENT_DATE - INTERVAL '6 days'
        AND date <= CURRENT_DATE
      `;
    } else if (period === "month") {
      dateFilter = `
        t.created_at::date >= CURRENT_DATE - INTERVAL '29 days'
        AND t.created_at::date <= CURRENT_DATE
      `;

      menuDateFilter = `
        date >= CURRENT_DATE - INTERVAL '29 days'
        AND date <= CURRENT_DATE
      `;
    }

    // Total meals for the selected period
    const meals = await pool.query(
      `
        SELECT COUNT(*)::int AS total
        FROM transactions t
        WHERE ${dateFilter}
      `,
      filterParams
    );

    // Total employees
    const employees = await pool.query(`
      SELECT COUNT(*)::int AS total
      FROM users
    `);

    // Available menu items for the selected period
    const menu = await pool.query(
      `
        SELECT COUNT(*)::int AS total
        FROM menu_items
        WHERE ${menuDateFilter}
          AND is_available = true
      `,
      filterParams
    );

    // Recent meal transactions
    const recent = await pool.query(
      `
        SELECT
          t.id,
          COALESCE(u.name, 'Employee') AS employee_name,
          COALESCE(u.department, 'General') AS department,
          UPPER(LEFT(COALESCE(u.name, 'E'), 1)) AS initials,
          TO_CHAR(t.created_at, 'HH12:MI AM') AS time,
          TO_CHAR(t.created_at, 'YYYY-MM-DD') AS date,
          t.meal_type,
          t.status
        FROM transactions t
        LEFT JOIN users u ON u.id = t.user_id
        WHERE ${dateFilter}
        ORDER BY t.created_at DESC
        LIMIT 20
      `,
      filterParams
    );

    // Meal-type breakdown for the selected period.
    const mealBreakdownResult = await pool.query(
      `
        SELECT
          COUNT(*) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'breakfast'
          )::int AS breakfast,

          COUNT(*) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'lunch'
          )::int AS lunch,

          COUNT(*) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) IN ('snack', 'snacks')
          )::int AS snacks,

          COUNT(*) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'dinner'
          )::int AS dinner

        FROM transactions t
        WHERE ${dateFilter}
      `,
      filterParams
    );

    // Day-by-day trend for Week and Month.
    let dailyTrend = [];

    if (period === "week" || period === "month") {
      const intervalDays = period === "week" ? "6 days" : "29 days";

      const trendResult = await pool.query(`
        SELECT
          TO_CHAR(d.day, 'Dy') AS label,
          TO_CHAR(d.day, 'DD Mon') AS display_date,

          COUNT(t.id)::int AS count,

          COUNT(t.id) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'breakfast'
          )::int AS breakfast,

          COUNT(t.id) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'lunch'
          )::int AS lunch,

          COUNT(t.id) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) IN ('snack', 'snacks')
          )::int AS snacks,

          COUNT(t.id) FILTER (
            WHERE LOWER(TRIM(t.meal_type)) = 'dinner'
          )::int AS dinner

        FROM generate_series(
          CURRENT_DATE - INTERVAL '${intervalDays}',
          CURRENT_DATE,
          '1 day'::interval
        ) AS d(day)

        LEFT JOIN transactions t
          ON t.created_at::date = d.day::date

        GROUP BY d.day
        ORDER BY d.day ASC
      `);

      dailyTrend = trendResult.rows;
    }

    const totalCount = meals.rows[0]?.total || 0;
    const mealBreakdown = mealBreakdownResult.rows[0] || {
      breakfast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    };

    // Dashboard res
    res.json({
      period,

      stats: {
        totalMeals: totalCount,
        totalMealsToday: totalCount,
        activeEmployees: employees.rows[0]?.total || 0,
        menuStatus:
          menu.rows[0]?.total > 0 ? "Operational" : "No menu",
      },

      mealBreakdown,
      dailyTrend,

      whoAte: recent.rows || [],
      whoAteToday: recent.rows || [],
    });
  } catch (error) {
    console.error("Error in /api/dash/stats:", error);

    res.status(500).json({
      error: "Error getting dashboard statistics",
    });
  }
});

// Settings
app.get("/api/settings", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        role,
        permissions
      FROM users
      ORDER BY id ASC
    `);

    res.json({
      staff: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error getting settings",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
