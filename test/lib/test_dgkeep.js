'use strict';

var dgkeep = require('../../lib/dgkeep');

var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.Console({level:'silly',timestamp:true,colorize:true})]});
var assert = require('assert');
var _ = require('lodash');
var Q = require('q');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('dgkeep_test', 'postgres', null,
                              {dialect: "postgres",
                               port: 5432});

describe('dgkeep', function(){
    describe('Setup', function(){
        it ('Should be able to initialize', function(){
            dgkeep(logger);
        });

        it ('Should return an error if the database can\'t connect', function(done){
            var dummySequelize = {authenticate: function(){
                var defer = Q.defer();
                defer.reject(new Error('Failed Connection'));
                return defer.promise.nodeify();
            }};
            dgkeep(logger, dummySequelize, function(err){
                if (err){
                    assert(err);
                } else {
                    assert.fail();
                }
                done();
            });
        });

        it ('Should be able to connect to the pgsql test database', function(done){
            assert.doesNotThrow(function(){
                dgkeep(logger, sequelize, done);
            });
        });
    });
});
