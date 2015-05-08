'use strict';
/*global describe:false, it:false, before:false, beforeEach:false*/
process.env.NODE_ENV = 'test'; //Set the environment to test so it uses the correct DB

var _ = require('lodash');

//cleanup sequelize log file.
var fs = require('fs');
var path = require('path');
fs.unlink(path.join(__dirname, '../../logs/sequelize.log'), _.noop);

var dgkeep = require('../../lib/dgkeep');
var models = require('../../models');
var mock_promise_based = require('./mock/mock_promise_based');

//Pieces of the models object that need to be mocked for testing
models.sequelize = mock_promise_based(models.sequelize);
models.Players = mock_promise_based(models.Players);
models.Courses = mock_promise_based(models.Courses);

var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'silly',timestamp:true,colorize:true})]});
var assert = require('assert');

var dgk = null;
var construct = {};
construct.before = function before(done){
    dgk = dgkeep(logger, models);
    dgk.isInitialized(function(res){
        if (!res){
            throw new Error("Failed to initialize");
        }
        done();
    });
};

construct.beforeEach = function beforeEach(done){
    models.sequelize.sync({force: true})
        .done(function(){
            done();
        });
    };

describe('dgkeep', function(){
    describe('Setup', function(){
        it('Should return an error if the database can\'t connect', function(done){
            models.sequelize.setError('authenticate', new Error('Failed to connect'));
            var dgk2 = dgkeep(logger, models);
            dgk2.isInitialized(function(res){
                assert.strictEqual(res, false);
                done();
            });
        });

        it('Should be able to connect to the pgsql test database', function(done){
            assert.doesNotThrow(function(){
                var dgk2 = dgkeep(logger, models);
                dgk2.isInitialized(function(res){
                    assert.strictEqual(res, true);
                    done();
                });
            });
        });
    });

    describe('Players', function(){
        before(construct.before);
        beforeEach(construct.beforeEach);

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
            dgk.createPlayer('Lee')
                .then(function(){
                    return dgk.createPlayer('Nick');
                }).then(function(){
                    return dgk.hasPlayer('Lee');
                }).then(function(res){
                    assert.equal(res, true);
                    return dgk.hasPlayer('Nick');
                }).done(function(res){
                    assert.equal(res, true);
                    done();
                });
        });
    });

    describe('Courses', function(){
        before(construct.before);
        beforeEach(construct.beforeEach);

        it('Should know if it doesn\'t have information about a course', function(done){
            dgk.hasCourse('Borderlands')
                .done(function(res){
                    assert.equal(res, false);
                    done();
                });
        });

        it('Should throw an error if it can\'t read from the db', function(done){
            var readFail = new Error('Failed to read');
            models.Courses.setError('find', readFail);
            dgk.hasCourse('Borderlands')
                .catch(function(err){
                    assert.equal(err, readFail);
                    done();
                });
        });

        it('Should be able to store a Course\'s name', function(done){
            dgk.createCourse('Borderlands')
                .then(function(){
                    return dgk.hasCourse('Borderlands');
                }).done(function(res){
                    assert.equal(res, true);
                    done();
                });
        });
    });
});
