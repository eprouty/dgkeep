'use strict';

module.exports = function courses(logger, dgkeep, models){
    dgkeep.getCourse = function getCourse(name){
        return models.Courses.find({where: {courseName: name}});
    };

    dgkeep.getCoursePars = function getCoursePars(name){
        return dgkeep.getCourse(name)
            .then(function(course){
                 return dgkeep.listHoles(course);
            })
            .then(function(holes){
                var pars = [];
                for (var i = 0; i < holes.length; i++){
                    pars.push(holes[i].par);
                }
                return pars;
            });
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

    return dgkeep;
};
