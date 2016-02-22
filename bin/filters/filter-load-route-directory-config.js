// filter-process-directory-config.js

var ARCTOOLS = require('arctools');
var ARCCORE = ARCTOOLS.arccore;
var FS = require('fs');
var PATH = require('path');

var normalizeRouteConfig = require('./filter-normalize-route-config');

var factoryResponse = ARCCORE.filter.create({
    operationID: "ihsZTDU9Qzao3f7xl60g1w",
    operationName: "Directory Config Loader",
    operationDescription: "Loads a project input directory configuration module from the specified directory path.",

    inputFilterSpec: require('./filter-load-route-directory-config-input'),
    outputFilterSpec: require('./filter-load-route-directory-config-output'),

    bodyFunction: function(request_) {
        var response = { error: null, error: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            if (!FS.existsSync(request_.sourcesDirectory) || !FS.statSync(request_.sourcesDirectory)) {
                errors.unshift("Specified route directory '" + request_.sourcesDirectory + "' does not exist or is not a directory.");
                break;
            }

            var routeDirectoryConfigPath = PATH.join(request_.sourcesDirectory, 'route-config.js');

            if (!FS.existsSync(routeDirectoryConfigPath) || !FS.statSync(routeDirectoryConfigPath)) {
                errors.unshift("Route directory for route '" + request_.primaryRoute + "' missing config file '" + routeDirectoryConfigPath + "'.");
                break;
            }

            var loaderResponse = ARCTOOLS.jsrcFileLoaderSync.request(routeDirectoryConfigPath);
            if (loaderResponse.error) {
                errors.unshift(loaderResponse.error);
                errors.unshift("While attempting to load route directory configuration:");
                break;
            }

            normalizerResponse = normalizeRouteConfig.request(loaderResponse.result.resource);
            if (normalizerResponse.error) {
                errors.unshift(normalizerResponse.error);
                errors.unshift("While normalizing route directory config file '" + routeDirectoryConfigPath + "':");
                break;
            }

            var routeConfigDescriptor = normalizerResponse.result;

            response.result = ARCCORE.util.clone(request_);
            response.result.routeConfig = routeConfigDescriptor;

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
