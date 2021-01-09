const express = require('express');
const fs = require('fs');
const app = express();

port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/video", (req, res) => {
    // the code
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
