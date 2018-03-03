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
        if (data.release && data.release.largeimageuri) {
          html += `<img class="album-art" src="${data.release.largeimageuri}" alt="album art">`;
        } else {
          html += `<img class="album-art" src="https://kexp.org/static/assets/img/default.png" alt="no album art">`; 
        }
        
        html += `<div class="track">
                   <h2>${data.artist.name}<h2>
                   <h3>${data.track.name}</h3>
                 </div>`;
        
        if (data.comments && data.comments.length > 0) {
          html += `<div class="comment">
                     <p>${data.comments[0].text}</p>
                   </div>`;
        }
        
        main.insertAdjacentHTML('beforeend', html);
        
      });
    }
  })
  .catch();
}
