const express = require("express");
const bodyParser = require("body-parser");
const querystring = require('query-string');
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  

  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nnp application." });
});
require("./app/routes/taikhoan.route.js")(app);
require("./app/routes/sanpham.route.js")(app);
require("./app/routes/loai.route.js")(app);
require("./app/routes/hoadon.route.js")(app);
require("./app/routes/mausize.route.js")(app);
// set port, listen for requestsno
app.listen(3002, () => {
  console.log("Server is running on port 3000.");
});