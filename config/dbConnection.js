const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .catch(() => console.error("Initial connection error"));

const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("disconnected", () =>
  console.log("Mongoose lost connection to the MongoDB server"),
);
db.once("open", () => console.log("Connected to database.."));
