const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const routes = require("./routes/restaurant.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/restaurant", routes);

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongo"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit();
  }
}

start();
module.exports = app;
