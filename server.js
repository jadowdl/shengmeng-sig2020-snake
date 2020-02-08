const express = require('express');
const app = express();

app.get("/hi", (req, resp) => {
    resp.send("Pigs fly Class");
});

app.listen(3000);
