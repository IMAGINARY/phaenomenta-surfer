window.onSussLoaded = function() {
  $('body').addClass('widget-loaded');
}

$(function() {
  if (window.parent !== window) {
    $('body').addClass('embeded');
  }

  function pushEquation() {
    $('.cindy-viewer iframe')[0].contentWindow.changeEquation($('#input-field').val());
  }
  $('#redraw-button').on('click', function() {
    pushEquation();
  });
  $('#input-field').on('keypress', function(ev) {
    if((ev.which ? ev.which : ev.keyCode)===13) {
      pushEquation();
    }
  })
});

