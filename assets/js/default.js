$('#redraw-button').on('click', function() {
  $('.cindy-viewer iframe')[0].contentWindow.changeEquation($('#input-field').val());
});