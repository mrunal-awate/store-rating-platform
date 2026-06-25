const pool = require("../config/db");

exports.getAllStores = async (req, res) => {
  try {

    const stores = await pool.query(
      `
      SELECT
      s.id,
      s.name,
      s.address,

      COALESCE(
        ROUND(AVG(r.rating),1),
        0
      ) AS overall_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      GROUP BY s.id

      ORDER BY s.name
      `
    );

    res.json(stores.rows);

  } catch (error) {
    console.log(error);
  }
};



exports.searchStores = async (req, res) => {
  try {

    const { keyword } = req.query;

    const stores = await pool.query(
      `
      SELECT *
      FROM stores
      WHERE
      name ILIKE $1
      OR address ILIKE $1
      `,
      [`%${keyword}%`]
    );

    res.json(stores.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};