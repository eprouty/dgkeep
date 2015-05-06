'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'dev';
var config = require(path.join(__dirname, '/../config/config.json'))[env];

var winston = require('winston');
var logger = new winston.Logger({transports: [new winston.transports.File({filename: path.join(__dirname, '/../logs/sequelize.log'),
                                                                           timestamp:true,
                                                                           colorize:true,
                                                                           json:true,
                                                                           maxsize: 104857600, //100mb
                                                                           maxFiles: 5})]});
config.logging = logger.info;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== basename;
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
