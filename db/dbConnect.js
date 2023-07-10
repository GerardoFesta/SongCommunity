
const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
  
  mongoose
    .connect(
        process.env.DB_URL,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("Connessione a MongoDB riuscita");
    })
    .catch((error) => {
      console.log("Connessione a MongoDB fallita");
      console.error(error);
    });
}

module.exports = dbConnect;