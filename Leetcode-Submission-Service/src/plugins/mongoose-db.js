import mongoose from "mongoose";
import fp from "fastify-plugin";
const connectDB = async (fastify, options) => {
  const { mongoURI } = options;
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connection successful.");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose default connection open to " + mongoURI);
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error: " + err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose default connection disconnected");
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(
          "Mongoose default connection disconnected through app termination"
        );
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default fp(connectDB);
