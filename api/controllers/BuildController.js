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
    async.parallel({
      troops: function (callback) {
        Troop.find({ sort: 'level' }).exec(callback);
      },
      barracks: function (callback) {
        Barracks.find({ sort: 'level' }).exec(callback);
      },
    }, function (err, results) {
      if (err) {
        return res.serverError();
      }

      res.view(results);
    });
  },

  /**
   * `BuildController.calculate()`
   */
  calculate: function (req, res) {
    res.json(req.body);
  },

  /**
   * `BuildController.default()`
   */
  defaultSetup: function (req, res) {
    var defaults = sails.config.defaultSetup;
    var troops = defaults.troops;
    var barracks = defaults.barracks;

    async.parallel({
      troops: function (callback) {
        async.series({
          destroy: function (callback) {
            Troop.destroy().exec(callback);
          },
          create: function (callback) {
            Troop.create(troops).exec(callback)
          },
        }, callback);
      },
      barracks: function (callback) {
        async.series({
          destroy: function (callback) {
            Barracks.destroy().exec(callback);
          },
          create: function (callback) {
            Barracks.create(barracks).exec(callback)
          },
        }, callback);
      }
    }, function (err, results) {
      if (err) {
        return res.serverError();
      }

      res.json(results);
    });
  },
};

