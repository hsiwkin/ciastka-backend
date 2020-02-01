const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com"
  };

  jwt.sign(
    { user },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    },
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

module.exports = app => app.use("/api", router);
