const pool =
require("../config/db");

exports.submitRating =
async (req, res) => {

  try {

    const {
      store_id,
      rating
    } = req.body;

    const existingRating =
      await pool.query(
        `
        SELECT *
        FROM ratings

        WHERE
        user_id=$1
        AND
        store_id=$2
        `,
        [
          req.user.id,
          store_id
        ]
      );

    if (
      existingRating.rows.length > 0
    ) {
      return res.status(400).json({
        message:
        "Rating already exists"
      });
    }

    const newRating =
      await pool.query(
        `
        INSERT INTO ratings
        (
          user_id,
          store_id,
          rating
        )

        VALUES
        (
          $1,
          $2,
          $3
        )

        RETURNING *
        `,
        [
          req.user.id,
          store_id,
          rating
        ]
      );

    res.status(201).json(
      newRating.rows[0]
    );

  } catch (error) {
    console.log(error);
  }
};


exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const updatedRating = await pool.query(
      `
      UPDATE ratings
      SET rating = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
      `,
      [
        rating,
        id,
        req.user.id
      ]
    );

    if (updatedRating.rows.length === 0) {
      return res.status(404).json({
        message: "Rating not found"
      });
    }

    res.json({
      message: "Rating updated successfully",
      rating: updatedRating.rows[0]
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};