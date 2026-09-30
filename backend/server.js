const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const menuRoutes = require("./routes/menuRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = [
  "https://canteen-frontend-2udm.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
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

// Dashboard
app.get("/api/dash/stats", async (req, res) => {
  try {
    const meals = await pool.query(
      "SELECT COUNT(*)::int AS total FROM transactions WHERE created_at::date = CURRENT_DATE"
    );

    const employees = await pool.query(
      "SELECT COUNT(*)::int AS total FROM users"
    );

    const menu = await pool.query(
      "SELECT COUNT(*)::int AS total FROM menu_items WHERE date = CURRENT_DATE AND is_available = true"
    );

    const recent = await pool.query(`
      SELECT
        t.id,
        u.name AS employee_name,
        u.department,
        LEFT(u.name, 1) AS initials,
        TO_CHAR(t.created_at, 'HH12:MI AM') AS time,
        t.meal_type,
        t.status
      FROM transactions t
      LEFT JOIN users u ON u.id = t.user_id
      WHERE t.created_at::date = CURRENT_DATE
      ORDER BY t.created_at DESC
      LIMIT 10
    `);

    res.json({
      stats: {
        totalMealsToday: meals.rows[0].total,
        activeEmployees: employees.rows[0].total,
        menuStatus:
          menu.rows[0].total > 0 ? "Operational" : "No menu",
      },
      whoAteToday: recent.rows,
    });
  } catch (error) {
    console.error(error);

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

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});