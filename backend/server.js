const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const expressip = require("express-ip");
// const path = require("path");

// app.use(expressip().getIpInfoMiddleware);
// app.get("/", function(req, res) {
//   // const ipInfo = req.ipInfo;
//   // console.log(ipInfo)
//   // var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
//   // res.send(message);
//   res.send("HELLO");
// });
app.get("/", (req, res) => res.send("Hello World!!"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/");
// app.use("/api/weather", weather);

// console.log that your server is up and running
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
