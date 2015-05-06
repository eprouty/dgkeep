'use strict';
process.env.NODE_ENV = 'test'; //Set the environment to test so it uses the correct DB

//cleanup sequelize log file.
var fs = require('fs');
try{
    fs.unlinkSync('../../logs/sequelize.log');
} catch (err) {} //Ignore this error

var DGKeep = require('../../lib/dgkeep');
var models = require('../../models');

var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'silly',timestamp:true,colorize:true})]});
var assert = require('assert');
var _ = require('lodash');
var Q = require('q');

describe('dgkeep', function(){
    describe('Setup', function(){
        it ('Should be able to initialize', function(){
            var dgk = DGKeep(logger);
            assert(dgk);
        });

        it ('Should return an error if the database can\'t connect', function(done){
            var dummySequelize = {authenticate: function(){
                var defer = Q.defer();
                defer.reject(new Error('Failed Connection'));
                return defer.promise.nodeify();
            }};
            var oldSequelize = models.sequelize;
            models.sequelize = dummySequelize;
            var dgk = DGKeep(logger, models);
            dgk.isInitialized(function(res){
                assert.strictEqual(res, false);
                models.sequelize = oldSequelize;
                done();
            });
        });

        it ('Should be able to connect to the pgsql test database', function(done){
            assert.doesNotThrow(function(){
                var dgk = DGKeep(logger, models);
                dgk.isInitialized(function(res){
                    assert.strictEqual(res, true);
                    done();
                });
            });
        });
    });

    describe('Players', function(){
        var dgkeep = null;

        before(function(done){
            dgkeep = DGKeep(logger, models);
            dgkeep.isInitialized(function(res){
                if (!res){
                    throw new Error("Failed to initialize");
                }
                done()
            });
        });

        beforeEach(function(done){
            models.sequelize.sync({force: true})
                .done(function(){
                    done();
                });
        });

        it('Should know if it doesnt have information about a player', function(done){
            dgkeep.hasPlayer('Lee')
                .done(function(res){
                    assert.equal(res, false);
                    done();
                });
        });

        it('Should be able to store a players name', function(){
            dgkeep.createPlayer('Lee');
            assert(dgkeep.hasPlayer('Lee'));
        });

        it('Should be able to store multiple players names', function(){
            dgkeep.createPlayer('Lee');
            dgkeep.createPlayer('Nick');
            assert(dgkeep.hasPlayer('Lee'));
            assert(dgkeep.hasPlayer('Nick'))
        })
    });
});
