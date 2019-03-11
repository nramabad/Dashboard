const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const expressip = require("express-ip");
// const path = require("path");
const weather = require("./routes/api/weather");
const pwned = require("./routes/api/pwned");

// app.use(expressip.getIpInfoMiddleware);
app.get("/", (req, res) => {
//   const ipInfo = req.ipInfo;
//   console.log(ipInfo)
//   var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.send("HAI");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/weather", weather);
app.use("/api/pwned", pwned);

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
