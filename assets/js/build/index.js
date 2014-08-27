$(function () {
  $('.add-barracks ul').on('click', 'a', function (event) {
    event.preventDefault();

    var troops = $('.troops h4').map(function () {
      return $(this).text();
    }).get();
    var level = $(this).data('level');

    $('.add-barracks').before(JST['assets/templates/build/index/barracks.html']({
      troops: troops,
      level: level,
    }));
  });
});
