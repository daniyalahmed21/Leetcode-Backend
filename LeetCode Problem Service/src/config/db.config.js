const mongoose = require("mongoose");
const { NODE_ENV, MONGO_URI } = require("./server.config");

async function connectDb() {
  try {
    if (NODE_ENV === "Development") {
      await mongoose.connect(MONGO_URI);
      console.log("connected to db");
    }
  } catch (error) {
    console.log(error);
    console.log("unable to connect to db");
  }
}

module.exports = { connectDb };
