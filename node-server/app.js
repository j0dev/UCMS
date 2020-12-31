const express = require("express");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const config = require("./config");
const port = process.env.port || 5000;
const cors = require("cors");
const app = express();
var http = require("http");
var server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.set("jwt-secret", config.secret);
app.set("jwt-refresh-secret", config.refreshSecret);
app.set("expiresIn", config.tokenLife);
app.set("refreshEpiresIn", config.refreshTokenLife);

app.get("/", (req, res) => {
  res.send("Hello JWT");
});

app.use(cors(config.corsOptions));

app.use("/api", require("./routes/api"));

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("connected to mogodb  server");
});

server.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
