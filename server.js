const fetch = require('node-fetch');
const express = require('express');
const app = express();
var   data = {
  "message": "No data yet",
  "status" : "not-ready"
};
var   id = null;

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/data", function (request, response) {
  response.send(data);
});

function update() {
  fetch("https://legacy-api.kexp.org/play/?format=json&limit=1&ordering=-airdate", {
    headers: { "User-Agent": "kexp-now-playing app, contact Emma Humphries <ech@emmah.net>" }
  }) 
    .then(response => {
      if (response.ok) {
        response.json()
        .then(newData => {
          var result = newData.results.pop();
          var newId  = result.playid;
          if (result.artist && newId !== id) {
            result.message = "Okay";
            result.status = 'ready';
            data = result;
          }
          console.log(data);
        })
        .catch(err => {
          data = {
              "message": `Error getting data: ${err}`,
              "status": 'not-ready'
          };
        });
      }
  })
}           
var timeout = setInterval(update, 60*1000);

// get first set of data
update();

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
