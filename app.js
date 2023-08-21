const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const routes = require("./routes");

const app = express();
mongoose.connect("mongodb://localhost:27017/wtwr_db"); // connect to mongoDB
const { PORT = 3001 } = process.env; // set PORT default to 3001

app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  req.user = {
    _id: "64e3bc1dd9ccc5cc152143dc", // paste the _id of the test user created in the previous step
  };
  next();
});

// set app listen at PORT
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("hello");
});
