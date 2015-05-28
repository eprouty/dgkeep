'use strict';

module.exports = function players(logger, dgkeep, models){
    dgkeep.createPlayer = function createPlayer(name){
        return models.Players.create({username: name});
    };

    dgkeep.hasPlayer = function hasPlayer(name){
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

    dgkeep.getPlayer = function getPlayer(name){
        return models.Players.find({where: {username: name}});
    };

    return dgkeep;
};
