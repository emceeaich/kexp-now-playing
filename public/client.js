var main, footer;

$(function () {
  main = document.querySelector("div.main");
  footer = document.querySelector("div.footer ul");

  refreshView();

  window.setInterval(refreshView, 15 * 1000);

  // do a refresh when navigating back to this tab
  addEventListener("visibilitychange", (event) => {
    if (document.visibilityState) {
      refreshView();
    }
  });
});

function refreshView() {
  $.getJSON("/data", function (data) {
    // clean up
    main.innerHTML = "";

    if (data.status === "not-ready") {
      main.insertAdjacentHTML("afterbegin", "<p>No data.</p>");
      return;
    }

    var html = "";
    var timestamp;
    var li;

    if (data.image_uri) {
      html +=
        '<img class="album-art" src="' +
        data.image_uri +
        '" alt="album art">';
    } else {
      html +=
        '<img class="album-art" src="https://kexp.org/static/assets/img/default.png" alt="no album art">';
    }

    html +=
      '<div class="track">' +
      "<h2>" +
      data.song +
      "</h2>" +
      "<h3>" +
      data.artist +
      "</h3>";

    if (data.album) {
      html += "<h4>" + data.album + "</h4>";
    }

    html += "</div>";

    if (data.comment && data.comment.length > 0) {
      html +=
        '<div class="comment">' +
        "<p>" +
        data.comment +
        "</p>" +
        "</div>";
    }

    main.insertAdjacentHTML("afterbegin", html);

    // Timestamp
    timestamp = new Date(data.airdate).toLocaleString();
    li = footer.querySelector(".timestamp");
    if (li) {
      li.remove();
    }
    footer.insertAdjacentHTML(
      "beforeend",
      '<li class="timestamp">Last update ' + timestamp + "</li>"
    );
  });
}
