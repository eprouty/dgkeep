'use strict';

module.exports = function courses(logger, dgkeep, models){
    dgkeep.getCourse = function getCourse(name){
        return models.Courses.find({where: {courseName: name}});
    };

    dgkeep.hasCourse = function hasCourse(name){
        return models.Courses.find({where: {courseName: name}})
            .then(function(course){
                if (!course){
                    return false;
                }
                return true;
            })
            .catch(function(err){
                throw err;
            });
    };

    dgkeep.createCourse = function createCourse(name){
        return models.Courses.create({courseName: name})
            .then(function(course){
                logger.info("Created new course", course.toJSON());
                return course;
            });
    };

    dgkeep.courseHasHole = function courseHasHole(course, num){
        return models.Holes.find({where: {holeNum: num,
                                          CourseId: course.id}})
            .then(function(hole){
                if(!hole){
                    return false;
                }
                return true;
            });
    };

    dgkeep.createHoleOnCourse = function createHoleOnCourse(course, num){
        return models.Holes.create({holeNum: num,
                                    CourseId: course.id})
            .then(function(hole){
                logger.info("New hole on " + course.courseName, hole.toJSON());
                return hole;
            });
    };

    return dgkeep;
};
