"use strict";

module.exports = function(sequelize, DataTypes) {
    var Players = sequelize.define("Players", {
            username: DataTypes.STRING
        });//, {
         //   classMethods: {
         //       associate: function(models) {
         //           User.hasMany(models.Task)
         //       }
         //   }
        // });

    return Players;
};
