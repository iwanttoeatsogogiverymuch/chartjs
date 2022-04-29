const express = require('express');
const app = express();
const path = require('path')
const port = 8080;

app.use('/static',express.static(__dirname + '/static'));


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, 'static/d3test.html')) })




app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
  })

  
