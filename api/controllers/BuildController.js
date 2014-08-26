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
    Troop.find({ sort: 'level' }).exec(function (err, troops) {
      if (err) {
        return res.serverError();
      }

      Barracks.find({ sort: 'level' }).exec(function (err, barracks) {
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
    res.json(req.body);
  },

  /**
   * `BuildController.default()`
   */
  defaultSetup: function (req, res) {
    var defaults = sails.config.defaultSetup;
    var troops = defaults.troops;
    var barracks = defaults.barracks;

    Troop.destroy().exec(function (err) {
      if (err) {
        return res.serverError();
      }

      Troop.create(troops).exec(function (err, troops) {
        if (err) {
          return res.serverError();
        }

        Barracks.destroy().exec(function (err) {
          if (err) {
            return res.serverError();
          }

          Barracks.create(barracks).exec(function (err, barracks) {
            if (err) {
              return res.serverError();
            }

            return res.json({
              troops: troops,
              barracks: barracks,
            });
          });
        });
      });
    });
  },
};

