'use strict';

module.exports = function scores(sequelize, DataTypes){
    var Scores = sequelize.define("Scores", {
        score: DataTypes.INTEGER
    }, {classMethods:
            {associate: function(models){
                Scores.belongsTo(models.PlayerRounds);
                Scores.belongsTo(models.Holes);
            }
        }
    });

    return Scores;
};
