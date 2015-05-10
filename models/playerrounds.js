'use strict';

module.exports = function playerrounds(sequelize, DataTypes){
    var PlayerRounds = sequelize.define("PlayerRounds", {
        PlayerId: DataTypes.INTEGER,
        RoundId: DataTypes.INTEGER
    });

    return PlayerRounds;
};
