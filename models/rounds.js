'use strict';

module.exports = function rounds(sequelize, DataTypes){
    var Rounds = sequelize.define('Rounds', {
            date: DataTypes.DATE
        }, {classMethods:
            {associate: function(models){
                    Rounds.belongsToMany(models.Players,
                                        {through: {model: models.PlayerRounds},
                                        foreignKey: 'RoundId'});
                    Rounds.belongsTo(models.Courses);
                    Rounds.hasMany(models.Scores);
                }
            }
        });

    return Rounds;
};
