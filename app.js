const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db"); // connect to mongoDB
const { PORT = 3001 } = process.env; // set PORT default to 3001

// set app listen at PORT
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("hello");
});
