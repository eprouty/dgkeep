"use strict";

module.exports = function(sequelize, DataTypes) {
    var Players = sequelize.define("Players", {
            username: DataTypes.STRING
        }, {classMethods:
            {associate: function(models) {
                    Players.belongsToMany(models.Rounds,
                                         {through: {model: models.PlayerRounds},
                                         foreignKey: "PlayerId"});
                }
            }
         });

    return Players;
};
