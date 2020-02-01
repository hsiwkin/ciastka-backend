const express = require("express");
const router = express.Router();
const offersMock = require("../mocks/offers.json");
const OfferModel = require("../models/offer.model");
const jwt = require("jsonwebtoken");

router.get("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const allOffers = await OfferModel.find();
      res.json({
        offers: allOffers,
        authData
      });
    }
  });
});

// Format of token
// Authorization: Bearer <access_token>

// Verify Token - middleware function
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = app => app.use("/api/offers", router);
