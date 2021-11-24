let mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  last: {
    type: Number,
  },
  buyprice: {
    type: Number,
  },
  sellprice: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  basicunit: {
    type: String,
  },
});

var Model = mongoose.model("Data", dataSchema);

module.exports = Model;
