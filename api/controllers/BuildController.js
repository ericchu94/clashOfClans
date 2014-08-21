/**
 * BuildController
 *
 * @description :: Server-side logic for managing builds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `BuildController.index()`
   */
  index: function (req, res) {
    Troop.find().exec(function (err, troops) {
      if (err) {
        return res.serverError();
      }

      Barrack.find().exec(function (err, barracks) {
        if (err) {
          return res.serverError();
        }

        res.view({
          troops: troops,
          barracks: barracks,
        });
      });
    });
  },

  /**
   * `BuildController.calculate()`
   */
  calculate: function (req, res) {
    var duration = 0;
    var user_barracks = [];

    Troop.find().exec(function (err, troops) {
      if (err) {
        return res.serverError();
      }

      for (var i = 0; i < troops.length; ++i) {
        var troop = troops[i];
        duration += req.body['troop' + troop.level] * troop.duration;
      }

      Barrack.find().exec(function (err, barracks) {
        if (err) {
          return res.serverError();
        }

        for (var i = 0; i < barracks.length; ++i) {
          var barrack = barracks[i];

          var count = req.body['barrack' + barrack.level];
          for (var j = 0; j < count; ++j) {
            user_barracks.push(barrack);
          }
        }

        if (user_barracks.length <= 0) {
          return res.badRequest();
        }

        var average = duration / user_barracks.length;
        troops.sort(function (a, b) {
          var x = a.space / a.duration;
          var y = b.space / b.duration;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        
        for (var i = 0; i < user_barracks.length; ++i) {
          var barrack = user_barracks[i];
          
          var capacity = 0;
          var duration = 0;

          while (capacity < barrack.capacity && duration < average) {

          }


        }
        res.json(req.body);
      });
    });
  },
};

