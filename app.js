const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const helmet = require("helmet"); // import helmet (security package)

const routes = require("./routes"); // import routes

const app = express();
mongoose.connect("mongodb://localhost:27017/wtwr_db"); // connect to mongoDB
const { PORT = 3001 } = process.env; // set PORT default to 3001

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: "64e3bc1dd9ccc5cc152143dc", // temporary user login
  };
  next();
});
app.use(routes);

// set app listen at PORT
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
