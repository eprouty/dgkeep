'use strict';

module.exports = function playerround(sequelize, DataTypes){
    var PlayerRound = sequelize.define("PlayerRounds", {
        PlayerId: DataTypes.INTEGER,
        RoundId: DataTypes.INTEGER
    });

    return PlayerRound;
};
