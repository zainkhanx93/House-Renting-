// create express app
const express = require("express");
const app = express();
const PORT = 3000;

// logs http requests
const logger = require("morgan");
app.use(logger("dev"));

// parses requests made to backend
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
