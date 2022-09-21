const Transport = require("../models/Transport");

module.exports.createTransport = async (req, res) => {
  const { source, destination, transport } = req.body;
  console.log(req.body);

  try {
    const checkTransport = await Transport.findOne({ source, destination });
    if (checkTransport) {
      return res.status(400).json({
        errors: [{ msg: "This place's transport is already setted." }],
      });
    }

    try {
      await Transport.create({
        source,
        destination,
        transport,
      });
      return res
        .status(200)
        .json({ msg: "Transport has been added successfully." });
    } catch (error) {
      console.log(error);
      console.log("Naiem Vai");
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.getAllTransports = async (req, res) => {
  try {
    const count = await Transport.find({}).countDocuments();
    const transport = await Transport.find({});
    // .sort({ updatedAt: -1 });
    return res.status(200).json({ response: transport, count });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.findTransport = async (req, res) => {
  const { source, destination } = req.body;

  try {
    const checkTransport = await Transport.findOne({ source, destination });
    if (!checkTransport) {
      return res.status(400).json({
        errors: [{ msg: "No transport found." }],
      });
    }
    if (checkTransport) {
      return res.status(200).json({ response: checkTransport });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
