const express = require("express");

const cors = require("cors");
const Hotel_controller = require("./Controller/Hotel_controller");

const app = express();
const port = 2222;

const connect = require("./config/db");

app.use(express.json());

app.use("/hotel", Hotel_controller);

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log("port " + port);
  } catch (error) {
    console.log(error);
  }
});
