const express = require("express");
const static = require("node-static");
const path = require('path')

const logger = require("./logger");

const app = express();

// const file = new(static.Server)(`${__dirname}/android-index.json`);

app.use('/', express.static(path.join(__dirname, 'dist')))

app.use((req, res, next) => {
    const [url, queryParams] = req.originalUrl.split("?")
    logger({
        "1. <-": { decoration: "dim" },
        [req.method]: { color: "cyan" },
        [url]: {},
        [queryParams || ""]: { decoration: "dim", pre: "?" }
    })
    next();
});

// app.get("/android-index.json", (req, res) => {
//     console.log("mtav")
//     file.serve(req, res);
// });

app.use((req, res, next) => {
    const [url, queryParams] = req.originalUrl.split("?")
    console.log(` 2. \x1b[2m<-\x1b[0m \x1b[35m${req.method}\x1b[0m ${url}\x1b[2m?${queryParams}\x1b[0m`, req.statusCode);
    next();
});

app.get("*", (req, res, next) => {
    const [url, queryParams] = req.originalUrl.split("?")
    console.log(` 3. \x1b[2m<-\x1b[0m \x1b[35m${req.method}\x1b[0m ${url}\x1b[2m?${queryParams}\x1b[0m`, req.statusCode);
    console.log("NOT FOUND!");
    next();
});

app.listen(8008, () => {
    console.log("Listening to port 8008")
});