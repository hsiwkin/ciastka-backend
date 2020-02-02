const offersRawData = require("../../mocks/offers.json");
const OfferModel = require("../../models/offer.model");

module.exports = async () => {
  await OfferModel.remove({});

  for (const offer of offersRawData) {
    const offerModel = new OfferModel({
      imageUrl: offer.imageUrl,
      title: offer.title,
      description: offer.description,
      extendedDescription: offer.extendedDescription,
      xloc: offer.location[0],
      yloc: offer.location[1]
    });

    await offerModel.save();
  }
};
