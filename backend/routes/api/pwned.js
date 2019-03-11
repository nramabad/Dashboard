const express = require("express");
const router = express.Router();
const request = require("request");


router.get("/test", (req, res) =>
  res.json({ msg: "This is the pwned test route" })
);


router.get('/:email', (req, res) => {
    // req.header("vnd.haveibeenpwned.v2+json");
    let options = {
        url: `https://haveibeenpwned.com/api/breachedaccount/${
            req.params.email
        }`,
        headers: {
            "User-Agent": "dashboard",
            "Accept": "vnd.haveibeenpwned.v2+json"
        }
    };
    request(
      options,
      (error, response, body) => {
        // console.log(body);
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