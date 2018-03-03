const fetch = require('node-fetch');
const express = require('express');
const app = express();
var   data = JSON.stringify({
  "message": "no data yet"
});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/data", function (request, response) {
  response.send(data);
});

function fetchData() {
  fetch( 
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
