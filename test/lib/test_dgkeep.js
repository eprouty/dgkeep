'use strict';
/*global describe:false, it:false, before:false, beforeEach:false*/
process.env.NODE_ENV = 'test'; //Set the environment to test so it uses the correct DB

var _ = require('lodash');

//cleanup sequelize log file.
var fs = require('fs');
var path = require('path');
fs.unlinkSync(path.join(__dirname, '../../logs/sequelize.log'));

var dgkeep = require('../../lib/dgkeep');
var models = require('../../models');
var mock_promise_based = require('./mock/mock_promise_based');

//Pieces of the models object that need to be mocked for testing
models.sequelize = mock_promise_based(models.sequelize);
models.Players = mock_promise_based(models.Players);

var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'silly',timestamp:true,colorize:true})]});
var assert = require('assert');

describe('dgkeep', function(){
    describe('Setup', function(){
        it('Should be able to initialize', function(){
            var dgk = dgkeep(logger);
            assert(dgk);
        });

        it('Should return an error if the database can\'t connect', function(done){
            models.sequelize.setError('authenticate', new Error('Failed to connect'));
            var dgk = dgkeep(logger, models);
            dgk.isInitialized(function(res){
                assert.strictEqual(res, false);
                done();
            });
        });

        it('Should be able to connect to the pgsql test database', function(done){
            assert.doesNotThrow(function(){
                var dgk = dgkeep(logger, models);
                dgk.isInitialized(function(res){
                    assert.strictEqual(res, true);
                    done();
                });
            });
        });
    });

    describe('Players', function(){
        var dgk = null;

        before(function(done){
            dgk = dgkeep(logger, models);
            dgk.isInitialized(function(res){
                if (!res){
                    throw new Error("Failed to initialize");
                }
                done();
            });
        });

        beforeEach(function(done){
            models.sequelize.sync({force: true})
                .done(function(){
                    done();
                });
        });

        it('Should know if it doesnt have information about a player', function(done){
            dgk.hasPlayer('Lee')
                .done(function(res){
                    assert.equal(res, false);
                    done();
                });
        });

        it('Should throw and error if it can\'t read from the db', function(done){
            models.Players.setError('find', new Error("Failed to read"));
            dgk.hasPlayer('Lee')
                .catch(function(err){
                    assert(err);
                    done();
                });
        });

        it('Should be able to store a players name', function(done){
            dgk.createPlayer('Lee')
                .then(function(){
                    return dgk.hasPlayer('Lee');
                }).done(function(res){
                    assert.equal(res, true);
                    done();
                });
        });

        it('Should be able to store multiple players names', function(done){
            dgk.createPlayer('Lee');
            dgk.createPlayer('Nick');
            dgk.hasPlayer('Lee')
                .then(function(res){
                    assert.equal(res, true);
                }).then(function(){
                    return dgk.hasPlayer('Nick');
                }).done(function(res){
                    assert.equal(res, true);
                    done();
                });
        });
    });
});
