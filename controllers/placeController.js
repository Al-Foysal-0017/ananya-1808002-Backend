const Place = require("../models/Place");

module.exports.createPlace = async (req, res) => {
  const { place } = req.body;
  console.log(place);

  try {
    const checkPlace = await Place.findOne({ place });
    if (checkPlace) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This place is already taken" }] });
    }
    let lowerCasePlace = place.toLowerCase();
    try {
      await Place.create({
        place: lowerCasePlace,
      });
      return res
        .status(200)
        .json({ msg: "Place has been added successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
module.exports.getPlaces = async (req, res) => {
  try {
    const count = await Place.find({}).countDocuments();
    const places = await Place.find({});
    // .sort({ updatedAt: -1 });
    return res.status(200).json({ response: places, count });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
