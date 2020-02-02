const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");

router.post("/register", async (req, res) => {
  const saltRounds = 10;
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(401);
  } else {
    const found = await UserModel.find({ username });
    if (found.length > 0) {
      res.sendStatus(409);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await new UserModel({
        username,
        password: hash
      }).save();

      res.json({
        username,
        _id: newUser._id
      });
    }
  }
});

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
