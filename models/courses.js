'use strict';

module.exports = function(sequelize, DataTypes) {
    var Courses = sequelize.define("Courses", {
            courseName: DataTypes.STRING
        });

    return Courses;
};
