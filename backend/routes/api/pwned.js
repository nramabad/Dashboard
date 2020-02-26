const express = require("express");
const request = require("request");

const router = express.Router();

router.get("/test", (req, res) =>
  res.json({ msg: "This is the pwned test route" })
);


router.get('/:email', (req, res) => {
    let options = {
        headers: {
            "User-Agent": "dashboard",
            "Accept": "vnd.haveibeenpwned.v2+json"
        },
        url: `https://haveibeenpwned.com/api/breachedaccount/${req.params.email}`
    };
    request(
      options,
      (error, response, body) => {
        // console.log(body);
        if (response && response.statusCode == 200) {
          res.json({ msg: JSON.parse(body) });
        } else {
                 // Print the error if one occurred
                 console.log("error:", error);
                 // Print the response status code if a response was received
                 console.log(
                   "statusCode:",
                   response && response.statusCode
                 );
               }
      }
    );
});

module.exports = router;
