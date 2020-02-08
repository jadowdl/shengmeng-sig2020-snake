const express = require('express');
const app = express();
app.get('/hi', (req, res) => {
  res.send('Some text');
});
app.listen(3000);
