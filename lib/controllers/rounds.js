'use strict';

module.exports = function rounds(logger, dgkeep, models){
    dgkeep.createRound = function createRound(courseId, players){
        return models.Rounds.create({CourseId: courseId})
            .then(function(round){
                var playerRounds = [];
                for (var i = players.length - 1; i >= 0; i--) {
                    playerRounds.push({RoundId: round.id,
                                       PlayerId: players[i].id});
                }
                return models.PlayerRounds.bulkCreate(playerRounds);
            });
    };

    dgkeep.roundInfo = function roundInfo(roundId){
        return models.Rounds.find({where: {id: roundId}, include: [models.Players, models.Courses]});
    };

    return dgkeep;
};
