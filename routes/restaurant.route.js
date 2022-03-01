const { Router } = require("express");
const router = Router();
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const restaurant = require("../models/Restaurant");

// /restaurant
// create
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = {
      rateAll: req.body.rateing,
      coords: { lat: req.body.lat, lng: req.body.lng },
      ...req.body,
    };
    const newRestaurant = await restaurant.create(data);
    res.json(newRestaurant);
  } catch (e) {
    console.log(e);
  }
});

// get one
router.get("/:id", async (req, res) => {
  console.log(req.params, "id");
  try {
    const getSingle = await restaurant.findOne({
      _id: req.params.id,
    });
    res.json(getSingle);
  } catch (e) {
    console.log(e);
  }
});

// update
router.put("/:id", async (req, res) => {
  console.log(req.params.id, "id");
  try {
    const newRestaurant = await restaurant.findOne({
      _id: req.params.id,
    });
    const { rateing, comments } = req.body;
    const rateAllCulc =
      newRestaurant.rateing.reduce((sum, current) => sum + current) /
      newRestaurant.rateing.length;
    newRestaurant.rateAll = rateAllCulc.toFixed(1);
    rateing && newRestaurant.rateing.push(rateing);
    comments && newRestaurant.comments.push(comments);
    await newRestaurant.save();
    res.json(newRestaurant.toObject());
  } catch (e) {
    console.log(e);
  }
});

// delete single
router.delete("/:id", async (req, res) => {
  try {
    await restaurant.findOneAndDelete({
      _id: req.params.id,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

// get restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await restaurant.find().sort({ rateAll: -1 });
    res.json(restaurants);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
