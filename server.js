const express = require('express');
const app = express();

const {Model} = require('./Model');
const m = new Model();

app.get("/hi", (req, resp) => {
    resp.send("Pigs fly Class");
});

app.get("/board", (req, resp) => {
    resp.send(m.serialize());
});

app.listen(3000);
