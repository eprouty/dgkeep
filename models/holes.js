'use strict';

module.exports = function(sequelize, DataTypes) {
    var Holes = sequelize.define("Holes", {
            holeNum: {type: DataTypes.INTEGER,
                      primaryKey: true},
            CourseId: {type: DataTypes.INTEGER,
                       primaryKey: true}
        }, {classMethods:
                {associate: function(models) {
                    Holes.belongsTo(models.Courses);
                }
            }
        });

    return Holes;
};
