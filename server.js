const express = require('express');
const app = express();

const {Model} = require('./Model');
const m = new Model();

function funct() {
  m.movesnake();
  setTimeout(funct, 30);
}
setTimeout(funct, 30);

function grow() {
  m.growSnake = true;
  setTimeout(grow, 2000);
}
setTimeout(grow, 2000);


app.get("/hi", (req, resp) => {
    resp.send("Pigs fly Class");
});

app.get("/board", (req, resp) => {
    resp.send(m.serialize());
});

app.get("/click", (req, resp) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    m.handleClickAt(y, x);
    console.log("Click @ ", x, y);
    resp.send("OK");
});

app.listen(3000);
