// filter-provider-staticfiles.js

var ARCCORE = require('arccore');

var providerLoadRequestSpec = require('./spec-provider-load-request');

var factoryResponse = ARCCORE.filter.create({

    operationID: "Z8lvZvTBQiSNcfAlHKuP_g",
    operationName: "StaticFiles Provider Loader",
    operationDescription: "Loads information germane to the StaticFiles provider.",

    inputFilterSpec: providerLoadRequestSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            response.result = { nothing: "This provider can't be loaded because it isn't implemented yet." };

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
