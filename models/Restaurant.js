const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const restaurantSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rateing: {
    type: [Number],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rateAll: {
    type: Number,
  },
  coords: {
    type: Object,
    required: true,
  },
  comments: {
    type: [],
  },
});

const restaurant = model("restaurant", restaurantSchema);
module.exports = restaurant;
