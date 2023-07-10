const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true,
}));



const bodyParser = require('body-parser');
const songRouter = require('./routes/song-router')
const userRouter = require('./routes/user-router') 
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

app.use('/api', songRouter)
app.use('/api', userRouter)

module.exports = app;
