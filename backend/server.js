const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");
const weather = require("./routes/api/weather");
const pwned = require("./routes/api/pwned");
const deepgram = require("./routes/api/deepgram");
// const drive = require("./routes/api/drive");
const audio = require("./routes/api/audio");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/weather", weather);
app.use("/api/pwned", pwned);
app.use("/api/deepgram", deepgram);
// app.use("/api/drive", drive);
app.use('/api/audio', audio);

const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

app.use("/*", staticFiles);


app.get("/", (req, res) => {
  res.send("hai. welcome to the backend. ;)");
});

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
