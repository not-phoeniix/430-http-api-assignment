const fs = require("fs");

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

function serveFile(req, res, content, mimetype) {
    res.writeHead(200, {
        "Content-Type": mimetype,
        "Content-Length": Buffer.byteLength(content, "utf8")
    });
    res.write(content);
    res.end();
}

function serveIndex(req, res) {
    serveFile(req, res, index, "text/html");
}

function serveStyle(req, res) {
    serveFile(req, res, style, "text/css");
}

module.exports = {
    serveIndex,
    serveStyle
};
