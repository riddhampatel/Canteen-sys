const pool = require("../db");

const getMenu = async (req, res) => {
  const result = await pool.query(`
      SELECT *
      FROM menu_items
      WHERE date = CURRENT_DATE
      ORDER BY meal_type, id
    `);

  const menu = result.rows.reduce((groupedMenu, item) => {
    groupedMenu[item.meal_type] ??= [];
    groupedMenu[item.meal_type].push(item);
    return groupedMenu;
  }, {});

  res.json({ menu });
};

const addMenuItem = async (req, res) => {
  const { name, meal_type, dietary_tag, price } = req.body;

  const result = await pool.query(
    `INSERT INTO menu_items
   (name, meal_type, dietary_tag, price, date, is_available)
   VALUES ($1, $2, $3, $4, CURRENT_DATE, true)
   RETURNING *`,
    [name, meal_type, dietary_tag, price],
  );

  res.json(result.rows[0]);
};

const toggleAvailability = async (req, res) => {
  const result = await pool.query(
    `UPDATE menu_items
       SET is_available = NOT is_available
       WHERE id = $1
       RETURNING *`,
    [req.params.id],
  );

  res.json(result.rows[0]);
};

const deleteMenuItem = async (req, res) => {
  const result = await pool.query(
    "DELETE FROM menu_items WHERE id = $1 RETURNING *",
    [req.params.id],
  );

  res.json(result.rows[0]);
};

module.exports = {
  getMenu,
  addMenuItem,
  toggleAvailability,
  deleteMenuItem,
};
