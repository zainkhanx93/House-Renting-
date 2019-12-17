// create express app
const express = require("express");
const path = require('path');
const app = express();
const PORT = 3000;

// logs http requests
const logger = require("morgan");
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'public')));
// parses requests made to backend
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
const routes = require('./routes/index')(app);


app.get("/hi", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
