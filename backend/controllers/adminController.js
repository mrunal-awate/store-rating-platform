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