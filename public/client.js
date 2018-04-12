var main, footer;
    
$(function() {
    main = document.querySelector('main');
    footer = document.querySelector('footer ul');
    renderData();
    window.setInterval(renderData, 60*1000);
  }
);
  
function renderData() {
  $.ajax('/data'
  fetch('/data')

        
        if (data.status === 'not-ready') {
          main.innerHTML = "<p>No data.</p>";
          return;
        }
        
        var html = "";
        var timestamp;
        var li;
        
        // clean up 
        main.innerHTML = "";
        if (data.release && data.release.largeimageuri) {
          html += `<img class="album-art" src="${data.release.largeimageuri}" alt="album art">`;
        } else {
          html += '<img class="album-art" src="https://kexp.org/static/assets/img/default.png" alt="no album art">'; 
        }
        
        html += `<div class="track">
                   <h2>${data.artist.name}<h2>
                   <h3>${data.track.name}</h3>`;
        
        if (data.release && data.release.name) {
          html += `<h4>${data.release.name}</h4>`; 
        }
        
        html +=  "</div>";
        
        if (data.comments && data.comments.length > 0) {
          html += `<div class="comment">
                     <p>${data.comments[0].text}</p>
                   </div>`;
        }
        
        main.insertAdjacentHTML('beforeend', html);
        
        // Timestamp
        timestamp = new Date(data.airdate).toLocaleString();
        li = footer.querySelector('.timestamp');
        if (li) {
          li.remove();
        }
        footer.insertAdjacentHTML('beforeend', `<li class="timestamp">Last update ${timestamp}</li>`);
        
      });
    }
  })
  .catch();
}
