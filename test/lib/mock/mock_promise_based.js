'use strict';
var Q = require('q');

module.exports = function(original){
    original.setError = function setError(func, err){
        var pristine = original[func];
        original[func] = function(){
            //reset the function back to normal
            original[func] = pristine;

            //return a rejected promise with the error that was given
            var defer = Q.defer();
            defer.reject(err);
            return defer.promise.nodeify();
        };
    };

    return original;
};
