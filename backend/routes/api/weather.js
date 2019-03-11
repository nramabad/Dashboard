const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/test", (req, res) => res.json({ msg: "This is the weather test route" }));


router.get('/search/:location', (req, res) => {
    request(
      `https://www.metaweather.com/api/location/search/?query=${req.params.location}`,
      (error, response, body) => {

        if (response && response.statusCode == 200) {
          res.json({ msg: JSON.parse(body)[0] });
        } else {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        }
      }
    );
}); 

router.get('/:id', (req, res) => {
  request(
    `https://www.metaweather.com/api/location/${req.params.id}`,
    (error, response, body) => {

      if (response && response.statusCode == 200) {
        res.json({ msg: JSON.parse(body) });
      } else {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      }
    }
  );
}); 

module.exports = router;