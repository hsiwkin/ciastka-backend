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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(401);
  } else {
    const user = await UserModel.findOne({ username });
    const isAuthenticated = bcrypt.compareSync(password, user.password);

    if (!isAuthenticated) {
      res.sendStatus(409);
    } else {
      jwt.sign(
        { username },
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
    }
  }
});

module.exports = app => app.use("/api", router);
