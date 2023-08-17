const express = require("express"); // import express

const app = express();
const { PORT = 3001 } = process.env; // set PORT default to 3001

// set app listen at PORT
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("hello");
});
