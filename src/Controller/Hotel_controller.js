const express = require("express");
const router = express.Router();
const hotel = require("../Models/Hotel_model");

router.post("", async (req, res) => {
  try {
    let hotels = await hotel.insertMany(req.body);
    return res.status(200).send(hotels);
  } catch (error) {
    console.log(error);
  }
});

router.get("", async (req, res) => {
  try {
    let hotels = await hotel.find().lean().exec();
    return res.status(200).send(hotels);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/:city", async (req, res) => {
//   try {
//     let place = req.params.city;
//     let data = await hotel.find({ city: place });
//     return res.send(data);
//   } catch (error) {}
// });
router.get("/:city/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let city = req.params.city;

    let data = await hotel.find({
      _id: id,
      city: city,
    });
    console.log(id, city);

    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:city", async (req, res) => {
  try {
    const page = req.query.page || 1;

    const size = req.query.size || 9;
    const city = req.params.city;

    const photels = await hotel
      .find({ city: city })
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await hotel.find({ city }).countDocuments()) / size
    );
    return res.send({ photels, totalPages });
  } catch (e) {
    console.log("error");
  }
});

module.exports = router;
