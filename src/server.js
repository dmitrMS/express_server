const express = require("express");
const bodyParser = require("body-parser");

const host = "localhost";
const port = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const message = req.query.message;

  if (message === undefined) {
    res.status(422).json({ error: `'${message}' was not provided` });
    return;
  }

  res.json({ message: message });
});

app.post("/", (req, res) => {
  const message = req.body.message;

  if (message === undefined) {
    res.status(422).json({ "error": `'${message}' was not provided` });
    return;
  }

  if (typeof message !== "string") {
    res.status(422).json({ "error": `'${message}' was not a string` });
    return;
  }
  
  res.json({ message: message });
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
