const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// require database connection 
const dbConnect = require("./db/dbConnect");

// execute database connection 
dbConnect();


app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Server is running" });
  next();
});


module.exports = app;
