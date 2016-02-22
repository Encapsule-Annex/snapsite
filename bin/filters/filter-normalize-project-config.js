// filter-normalize-project-config.js

var ARCCORE = require('arccore');
var PATH = require('path');

var factoryResponse = ARCCORE.filter.create({
    operationID: "cPIM0OB7SPGTHVkgUlWnqw",
    operationName: "Project Config Normalizer",
    operationDescription: "Normalizes developer input data sourced from project configuration module.",

    inputFilterSpec: require('./spec-user-project-config'),

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            if (PATH.isAbsolute(request_.dirs.input.routes)) {
                errors.unshift("Invalid absolute routes input directory '" + request_.dirs.input.routes + "'.");
            }
            for (var property in request_.dirs.output) {
                if (PATH.isAbsolute(request_.dirs.output[property])) {
                    errors.unshift("Invalid absolute output directory '" + request_.dirs.output[property] + "'.");
                }
            }
            if (errors.length) {
                break;
            }
            response.result = request_;
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

