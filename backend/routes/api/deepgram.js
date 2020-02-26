const express = require("express");
const axios = require("axios");
const unirest = require("unirest");
const { username, password, apiKey } = require("../../secrets");

const router = express.Router();

let url = 'https://brain.deepgram.com/v2/listen';

const transcribe = (res, audio) => {
    axios({
        method: 'post',
        url,
        auth: {
            username,
            password,
        },
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            url: audio
        }
    }).then(({ data }) => {
        return data;
    }).catch(error => {
        res.status(500).json(error);
    });
};

router.get("/test", (req, res) =>
    res.json({ msg: "This is the deepgram test route" })
);

router.get('/random', (req, res) => {
   unirest
       .get('https://listen-api.listennotes.com/api/v2/just_listen')
       .headers({'User-Agent': 'dashboard', 'X-ListenAPI-Key': apiKey, 'Accept': 'application/json', 'Content-Type': 'application/json'})
       .then(({audio, image, title, publisher, audio_length_sec}) => {
           res.json(Object.assign({}, transcribe(res, audio), {title, publisher, audio, image, length: audio_length_sec}));
       });
});

// TODO: move to frontend
router.get('/:search', (req, res) => {
    unirest
        .get(`https://listen-api.listennotes.com/api/v2/typeahead?q=${req.params.query}`)
        .then(() => {
            res.json({});
        });
});

module.exports = router;
