const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/api/hello-world-get", (req, res) => {
  res.send('hello world');
});

app.post("/api/hello-world-post", (req, res) => {
  res.send(req.body);
});

console.log("poggers")