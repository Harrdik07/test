let express = require("express");
let app = express();
const path = require("path");
const hbs = require("hbs");
let mongoose = require("mongoose");
let axios = require("axios");
let Model = require("./model/Model.js");

axios.get("https://api.wazirx.com/api/v2/tickers").then(function (response) {
  let arr = [];
  for (let key in response.data) {
    // console.log(response.data[key]);
    arr.push(response.data[key]);
  }
  for (let i = 0; i <= 9; i++) {
    let name = arr[i].name;
    let last = arr[i].last;
    let buy = arr[i].buy;
    let sell = arr[i].sell;
    let volume = arr[i].volume;
    let base_unit = arr[i].base_unit;

    const newrec = new Model({
      name: name,
      last: last,
      buyprice: buy,
      sellprice: sell,
      volume: volume,
      basicunit: base_unit,
    });

    newrec.save((err, data) => {
      if (!err) {
        console.log("Successfully");
      }
    });
  }
});

app.get("/getdata", async (req, res) => {
  let data = await Model.find();
  res.render("home.hbs", { data });
});

app.set("views", path.join(__dirname));
app.set("view engine", "hbs");

mongoose
  .connect("mongodb://localhost:27017/usersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.listen(8000, () => {
  console.log("App listend on 8000 port");
});
