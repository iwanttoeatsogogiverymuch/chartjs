var express = require('express');
var app = express();
var port = 8080;

app.use(express.static('/static'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
