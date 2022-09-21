const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const path = require("path");
const router = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");
const transportRoutes = require("./routes/transportRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());

// connect mongodb database
connect();
app.use(bodyParser.json());
app.use("/", router);
app.use("/", placeRoutes);
app.use("/", transportRoutes);
const PORT = process.env.PORT || 5500;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build/")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Your app is running");
});
