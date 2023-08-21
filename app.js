const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const routes = require("./routes");

const app = express();
mongoose.connect("mongodb://localhost:27017/wtwr_db"); // connect to mongoDB
const { PORT = 3001 } = process.env; // set PORT default to 3001

app.use(routes);
app.use(express.json());

// set app listen at PORT
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("hello");
});
