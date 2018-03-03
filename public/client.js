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
      .then(body => {
        // clean up 
        main.innerHTML = '';
      }

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
