'use strict';

module.exports = function(sequelize, DataTypes) {
    var Holes = sequelize.define("Holes", {
            holeNum: {type: DataTypes.INTEGER,
                      unique: 'hole_num_course'},
            CourseId: {type: DataTypes.INTEGER,
                       unique: 'hole_num_course'}
        }, {classMethods:
                {associate: function(models) {
                    Holes.belongsTo(models.Courses);
                    Holes.hasMany(models.Scores);
                }
            }
        });

    return Holes;
};
