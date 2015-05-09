'use strict';

module.exports = function scores(sequelize, DataTypes){
    var Scores = sequelize.define("Scores", {
        score: DataTypes.INTEGER
    }, {classMethods:
            {associate: function(models){
                Scores.belongsTo(models.Players);
                Scores.belongsTo(models.Holes);
                Scores.belongsTo(models.Rounds);
            }
        }
    });

    return Scores;
};
