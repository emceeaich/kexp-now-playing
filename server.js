const fetch = require('node-fetch');
const express = require('express');
const app = express();
var   data = JSON.stringify({
  "message": "No data yet",
  "status" : "not-ready"
});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/data", function (request, response) {
  response.send(data);
});

function update() {
  fetch("https://legacy-api.kexp.org/play/?format=json&limit=1&ordering=-airdate")
    .then(response => {
      if (response.ok)
      response.json()
      .then(data => {
        data.message = "Okay",
        data.status = 'ready'
      })
      .error(err => {
        data = JSON.stringify({
            "message": `Error getting data: ${err}`,
            "status": 'not-ready'
        });
      });
  })
}
          
var timeout = setInterval(update, 60*1*1000);

// get first set of data
update();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
