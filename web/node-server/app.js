const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const port = process.env.port || 80;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.set("jwt-secret", config.secret);
app.get("/", (req, res) => {
  res.send("Hello JWT");
});
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("connected to mogodb  server");
});
