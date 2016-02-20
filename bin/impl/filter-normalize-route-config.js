
var ARCCORE = require('arccore');

var factoryResponse = ARCCORE.filter.create({
    operationID: "60x-9pR6QtSPh6qURp9MLQ",
    operationName: "Route Directory Config Normalizer",
    operationDescription: "Normalizes a route directory configuration descriptor read from each route directory by route directory config loader filter.",

    inputFilterSpec: require('./filter-normalize-route-config-input'),
    outputFilterSpec: require('./filter-normalize-route-config-output'),

    bodyFunction: function (request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            // DO SOME STUFF
            response.result = request_; // echo
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }

});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
