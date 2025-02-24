const mongoose = require("mongoose");
const DB = process.env.MONGO_URI;


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });