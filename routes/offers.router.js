const express = require("express");
const router = express.Router();
const offersMock = require("../mocks/offers.json");
const OfferModel = require("../models/offer.model");
const jwt = require("jsonwebtoken");
const verifyToken = require("./helpers/jwt-helper");

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

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const { imageUrl, title, description, extendedDescription } = req.body;
      const newOffer = await new OfferModel({
        imageUrl,
        title,
        description,
        extendedDescription
      }).save();

      res.json(newOffer);
    }
  });
});

module.exports = app => app.use("/api/offers", router);
