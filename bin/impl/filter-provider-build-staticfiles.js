// filter-provider-build-staticfiles.js

const ARCCORE = require('arccore');

var factoryResponse = ARCCORE.filter.create({
    operationID: "k8FrOMQbR-eIakOzGAodwg",
    operationName: "StaticFiles Provider Builder",
    operationDescription: "Builds static files resources for primary routes associated with the StaticFiles provider subsystem.",

    bodyFunction: function(request_) {
        return { error: null, result: "NOT IMPLEMENTED YET" };
    }

});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
