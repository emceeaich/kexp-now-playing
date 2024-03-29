const fetch = require("node-fetch");
const express = require("express");
const app = express();
const POLL_INTERVAL = 30;
var data = {
  message: "No data yet",
  status: "not-ready"
};
var id = null;

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/data", function(request, response) {
  response.send(data);
});

function update() {
  console.debug('in update')
  fetch("https://api.kexp.org/play/?format=json&limit=5ordering=-airdate").then(response => {
    if (response.ok) {
      response
        .json()
        .then(newData => {
          var result = newData.results.find(result => {
            return result.artist; // return the most recent artist played, skipping air breaks and promos
          });
          var newId = result.playid;
          if (result.artist && newId !== id) {
            result.message = "Okay";
            result.status = "ready";
            data = result;
            id = newId;
          }
          console.log(data);
        })
        .catch(err => {
          data = {
            message: `Error getting data: ${err}`,
            status: "not-ready"
          };
        });
    } else {
      console.error(response.status, response.statusText)
    }
  });
}
var timeout = setInterval(update, POLL_INTERVAL * 1000);

// get first set of data
update();

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
