const express = require("express");
const { PORT } = require("./config/server.config");
const bodyParser = require("body-parser");
const app = express();
const { apiRouter } = require("./routes/index.js");
const { errorHandler } = require("./utils");
const { connectDb } = require("./config/db.config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);
  await connectDb();
});
