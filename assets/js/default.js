window.onSussLoaded = function() {
  $('body').addClass('widget-loaded');
}

$(function() {
  if (window.parent !== window) {
    $('body').addClass('embeded');
  }
  $('#redraw-button').on('click', function() {
    $('.cindy-viewer iframe')[0].contentWindow.changeEquation($('#input-field').val());
  });
});

