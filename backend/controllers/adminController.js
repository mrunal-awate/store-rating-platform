const pool = require("../config/db");
const bcrypt = require("bcryptjs");


exports.getDashboard = async (req, res) => {
  try {

    const users = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const stores = await pool.query(
      "SELECT COUNT(*) FROM stores"
    );

    const ratings = await pool.query(
      "SELECT COUNT(*) FROM ratings"
    );

    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count
    });

  } catch (error) {
    console.log(error);
  }
};



exports.addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await pool.query(
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        name,
        email,
        hashedPassword,
        address,
        role
      ]
    );

    res.status(201).json(user.rows[0]);

  } catch (error) {
    console.log(error);
  }
};

exports.addStore = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const store = await pool.query(
      `INSERT INTO stores
      (name,email,address,owner_id)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [
        name,
        email,
        address,
        owner_id
      ]
    );

    res.status(201).json(
      store.rows[0]
    );

  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {

  try {

    const users =
      await pool.query(
        `SELECT
         id,
         name,
         email,
         address,
         role
         FROM users
         ORDER BY id DESC`
      );

    res.json(users.rows);

  } catch (error) {
    console.log(error);
  }
};


exports.getStores = async (req, res) => {

  try {

    const stores =
      await pool.query(
        `
        SELECT
        s.*,

        COALESCE(
          ROUND(
            AVG(r.rating),
            1
          ),
          0
        ) AS average_rating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id = r.store_id

        GROUP BY s.id

        ORDER BY s.id DESC
        `
      );

    res.json(
      stores.rows
    );

  } catch (error) {
    console.log(error);
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE
        LOWER(name) LIKE LOWER($1)
        OR LOWER(email) LIKE LOWER($1)
        OR LOWER(address) LIKE LOWER($1)
        OR LOWER(role) LIKE LOWER($1)
      ORDER BY id DESC
      `,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};