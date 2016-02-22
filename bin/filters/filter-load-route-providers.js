
const ARCCORE = require('arccore');

const inputFilterSpec = require('./spec-providers-load-request');

var factoryResponse = ARCCORE.filter.create({
    operationID: "XUO0uDiLRJW0Zq5n7dkUXw",
    operationName: "Route Providers Loader",
    operationDescription: "Dispatch provider-specific loaders associated with all primary routes.",

    inputFilterSpec: inputFilterSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            var providerConfigMap = {};
            for (var provider in request_.projectManifest.routeConfig.routeProvidersMap) {
                var providerLoaderResponse = request_.providers[provider].load.request({
                    projectManifest: request_.projectManifest,
                    routeHashes: request_.projectManifest.routeConfig.routeProvidersMap[provider],
                    callback: request_.callback
                });
                if (providerLoaderResponse.error) {
                    errors.unshift(providerLoaderResponse.error);
                    break;
                }
                providerConfigMap[provider] = providerLoaderResponse.result;
            }
            if (errors.length) {
                break;
            }
            response.result = providerConfigMap;
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
