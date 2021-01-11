const express = require('express');
const fs = require('fs');
const app = express();

port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const videoPath = "jake_chilling.mp4";
const videoSize = fs.statSync(videoPath).size;
const chunk_size = 10 ** 6; // 1MB

app.get("/video", (req, res) => {
    // the code

    const range = req.headers.range;
    if (!range) {
        res.send(400).send("It Requires a range header")
    }

    // Partial Content 206
    // replace non digit characters with empty strings
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunk_size, videoSize - 1);

    const contentLength = end - start + 1;
    // header
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    // Partial content
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);

});

app.listen(port, () => {
    console.log(`Listening on ${port} 🚀`);
});
