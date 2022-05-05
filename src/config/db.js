const mongoose = require("mongoose");

module.exports = () =>
  mongoose.connect(
    "mongodb+srv://biswa:biswa123@cluster0.n5arm.mongodb.net/airbnb"
  );
