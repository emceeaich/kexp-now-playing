var main;

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    main = document.querySelector('main');
    renderData();
    window.setInterval(renderData, 60*1000);
  }
};
  
function renderData() {
  fetch('/data')
  .then(response => {
    if(response.ok) {
      response.json()
      .then(data => {
        var html = "";
        // clean up 
        main.innerHTML = "";
        if "
        `<img class="album-art" src="${data.release.largeimageuri}" alt="album art">
                          <div class="track">
                          <h2>${data.artist.name}<h2>
                          <h3>${data.track.name}</h3>
                          <h4>${data.release.name}</h4>
                          </div>
                          <div class="comment">
                            <p>${data.comments[0].text}</p>
                          </div>`;
      });
    }
  })
  .catch();
}
