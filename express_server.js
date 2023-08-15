const express = require("express");
const bodyParser = require("body-parser");

const host = "localhost";
const port = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const message = req.query.message;

  if (typeof message === "string") {
    res.json({message: message});
  } else {
    res.status(422).json(`error`);
  }
});

app.post("/", (req, res) => {
  const message = req.body.message;

  if (typeof message === "string") {
    res.json({message: message});
  } else {

    console.log(typeof message);
    res.status(422).json({"error": `'${message}' was not a string`});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
