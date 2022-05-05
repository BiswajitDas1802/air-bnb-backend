const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    img: [{ type: String, require: true }],
    location: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    star: { type: Number, require: true },
    price: { type: String, require: true },
    total: { type: String, require: true },
    coord: [{ type: Number, require: true }],
    city: { type: String, require: true },
    user: { type: String, require: true },
    dp: { type: String, require: true },
    u_desc: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
