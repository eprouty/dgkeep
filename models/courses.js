'use strict';

module.exports = function(sequelize, DataTypes) {
    var Courses = sequelize.define("Courses", {
            courseName: {type: DataTypes.STRING,
                         unique: true}
        }, {classMethods:
                {associate: function(models){
                    Courses.hasMany(models.Holes);
                }
            }
        });

    return Courses;
};
