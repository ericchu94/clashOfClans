$(function () {
  function calculate() {
    // prepare data
    var _csrf = $('.build-index').data('_csrf');
    var troops = {};
    var barracks = {};

    $('.troops input').each(function () {
      troops[$(this).data('level')] = $(this).val();
    });

    $('.barracks').each(function () {
      var level = $(this).data('level');
      if (barracks[level]) {
        ++barracks[level]
      } else {
        barracks[level] = 1;
      }
    });

    io.socket.post('/build/calculate', {
      troops: troops,
      barracks: barracks,
      _csrf: _csrf,
    }, function (data) {
      console.log(data);
    });
  }

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

    calculate();
  });

  $('.troops').on('change keypress', 'input', calculate);
});
