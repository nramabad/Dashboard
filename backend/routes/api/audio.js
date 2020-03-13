const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
const express = require("express");
const multer = require('multer');
const readline = require('readline');
const { Readable } = require('stream');

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const router = express.Router();

/**
 * GET /audio/:name
 */
router.get('/:name', (req, res) => {
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    const [name, type] = req.params.name.split('.');

    // Load client secrets from a local file.
    // fs.readFile(path.join(__dirname, './credentials.json'), (err, content) => {
    //     if (err) return console.log('Error loading client secret file:', err);
    //     // Authorize a client with credentials, then call the Google Drive API.
    //     authorize(JSON.parse(content), listFiles);
    // });
    // console.log(name)
    //
    // const listFiles = auth => {
    //     const drive = google.drive({version: 'v3', auth});
    //     drive.files.list({
    //         q: `name contains '${name}'`,
    //         pageSize: 1,
    //         spaces: 'drive',
    //         fields: 'files(id, name)',
    //     }, (err, res) => {
    //         if (err) return console.log('The API returned an error: ' + err);
    //         const files = res.data.files;
    //         if (files.length) {
    //             console.log('FILES')
    //             console.log(files)
    //
    //
    //             drive.files.get({
    //                 fileId: files[0].id,
    //                 alt: 'media'
    //             // }).on('data', (chunk) => {
    //             //     res.write(chunk);
    //             }, {responseType: 'stream'}, function(response, err) {
    //                 console.log(err)
    //                 console.log(response)
    //                 response.data
    //                     .on('end', () => {
    //                         console.log('Done');
    //                     })
    //                     .on('error', err => {
    //                         console.log('Error', err);
    //                     })
    //                     .pipe(res)
    //             });
    //
    //         } else {
    //             console.log('No files found.');
    //         }
    //     });
    // };
//
// .pipe(dest);
});


/**
 * POST /audio/:name
 */
router.post('/:name', (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
    upload.single('track')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Upload Request Validation Failed" });
        } else if(!req.body.name) {
            return res.status(400).json({ message: "No track name in request body" });
        }

        let name = req.params.name || req.body.name;

        // Covert buffer to Readable Stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        const [ fileType ] = name.split('.').slice(-1);
        const media = {
            mimeType: `audio/${fileType}`,
            body: readableTrackStream,
        };

        // Load client secrets from a local file.
        fs.readFile(path.join(__dirname, './credentials.json'), (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), createFile);
        });

        const createFile = auth => {
            const drive = google.drive({version: 'v3', auth});

            drive.files.create({
                resource: { name },
                media,
                fields: 'id'
            }, function (err, file) {
                if (err) {
                    // Handle error
                    console.error(err);
                } else {
                    console.log('File Id: ', file.id);
                }
            });
        }
    });
});

module.exports = router;
