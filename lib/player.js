'use strict';

module.exports = function(logger, dgkeep, models){
    dgkeep.createPlayer = function createPlayer(name){
        return models.Players.create({username: name});
    };

    dgkeep.hasPlayer = function readPlayer(name){
        return models.Players.find({where: {username: name}})
            .then(function(err, player){
                if (err){
                    throw err;
                } else if (!player){
                    return false;
                }

                return true;
            });
    };

    return dgkeep;
};
