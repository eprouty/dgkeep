'use strict';

module.exports = function(logger, dgkeep, models){
    dgkeep.createPlayer = function createPlayer(name){
        return models.Players.create({username: name});
    };

    dgkeep.hasPlayer = function readPlayer(name){
        return models.Players.find({where: {username: name}})
            .then(function(player){
                if (!player){
                    return false;
                }
                return true;
            })
            .catch(function(err){
                throw err;
            });
    };

    return dgkeep;
};
