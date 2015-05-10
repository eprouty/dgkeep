'use strict';

module.exports = function(logger, dgkeep, models){
    dgkeep.addScore = function(playerround, holeNum, score){
        return dgkeep.roundInfo(playerround.RoundId)
            .then(function(roundInfo){
                return dgkeep.getHole(roundInfo.CourseId, holeNum);
            })
            .then(function(hole){
                return models.Scores.create({PlayerRoundId: playerround.id,
                                             HoleId: hole.id,
                                             score: score});
            }).then(function(s){
                logger.info("New score", s.toJSON());
                return s;
            });
    };

    return dgkeep;
};
