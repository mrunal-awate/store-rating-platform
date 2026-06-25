const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
      (name,email,password,address,role)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        name,
        email,
        hashedPassword,
        address,
        "USER"
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};



exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        role: user.rows[0].role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token,
      user: user.rows[0]
    });

  } catch (error) {
    console.log(error);
  }
};




exports.changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE id=$1",
      [req.user.id]
    );

    const validPassword = await bcrypt.compare(
      oldPassword,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Old password incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await pool.query(
      "UPDATE users SET password=$1 WHERE id=$2",
      [hashedPassword, req.user.id]
    );

    res.json({
      message: "Password updated successfully"
    });

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
      OR
      address ILIKE $1
      `,
      [`%${keyword}%`]
    );

    res.json(stores.rows);

  } catch (error) {
    console.log(error);
  }
};


exports.updateRating =
async (req, res) => {

  try {

    const { id } = req.params;

    const { rating } = req.body;

    const updated =
      await pool.query(
        `
        UPDATE ratings

        SET rating=$1

        WHERE
        id=$2
        AND
        user_id=$3

        RETURNING *
        `,
        [
          rating,
          id,
          req.user.id
        ]
      );

    res.json(
      updated.rows[0]
    );

  } catch (error) {
    console.log(error);
  }
};