'use strict';

module.exports = function holes(logger, dgkeep, models){
    dgkeep.hasHole = function hasHole(course, num){
        return models.Holes.find({where: {holeNum: num,
                                          CourseId: course.id}})
            .then(function(hole){
                if(!hole){
                    return false;
                }
                return true;
            });
    };

    dgkeep.createHole = function createHole(course, num){
        return models.Holes.create({holeNum: num,
                                    CourseId: course.id,
                                    par: 3})
            .then(function(hole){
                logger.info("New hole on " + course.courseName, hole.toJSON());
                return hole;
            });
    };

    dgkeep.createHoles = function createHoles(course, count){
        var newholes = [];
        for (var i = 1; i <= count; i++){
            newholes.push({
                holeNum: i,
                CourseId: course.id,
                par: 3
            });
        }
        return models.Holes.bulkCreate(newholes, {returning: true});
    };

    dgkeep.listHoles = function listHoles(course){
        return models.Holes.findAll({where: {CourseId: course.id}});
    };

    dgkeep.getHole = function getHole(courseid, num){
        return models.Holes.find({where: {CourseId: courseid,
                                          holeNum: num}});
    };

    dgkeep.getHolePar = function getPar(courseid, num){
        return dgkeep.getHole(courseid, num)
            .then(function(hole){
                if(!hole){
                    return -1;
                }

                return hole.par;
            });
    };

    return dgkeep;
};
