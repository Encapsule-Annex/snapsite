// filter-build-route-providers.js

const ARCCORE = require('arccore');

const routeProvidersBuildRequestSpec = require('./spec-providers-build-request');

var factoryResponse = ARCCORE.filter.create({
    operationID: "Se4_2mLXSkW6naCt02nsSg",
    operationName: "Route Provider Builder",
    operationDescription: "Dispatch provider-specific builders associated with all primary routes.",

    inputFilterSpec: routeProvidersBuildRequestSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            var providerBuildResultMap = {};

            for (var provider in request_.projectManifest.routeConfig.routeProvidersMap) {
                var providerResponse = request_.providers[provider].build.request({
                    projectManifest: request_.projectManifest,
                    providers: request_.providers,
                    providerConfig: request_.providersConfigMap[provider],
                    routeHashes: request_.projectManifest.routeConfig.routeProvidersMap[provider],
                    callback: request_.callback
                });
                if (providerResponse.error) {
                    errors.unshift(providerResponse.error);
                    break;
                }
                providerBuildResultMap[provider] = providerResponse.result;
            }
            response.result = providerBuildResultMap;
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
