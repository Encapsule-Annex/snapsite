// filter-load-route-graph.js

const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;
const PATH = require('path');
const FS = require('fs');

const loadRouteDirectoryConfig = require('./filter-load-route-directory-config');

var factoryResponse = ARCCORE.filter.create({

    operationID: "AjQBeuZ6TDusFGcTQVqw0Q",
    operationName: "Route Graph Generator",
    operationDescription: "Generates a model of the route structure of the site.",

    inputFilterSpec: require('./filter-load-route-config-input'),
    outputFilterSpec: require('./filter-load-route-config-output'),

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            var siteHashSeed = request_.projectConfig.org.seed + ":" + request_.projectConfig.site.seed;
            var siteHash = ARCCORE.identifier.irut.fromReference(siteHashSeed).result;
            console.log("... " + siteHashSeed + " -> " + siteHash);

            var graphFactoryResponse = ARCCORE.graph.directed.create({
                name: siteHash,
                description: "[" + siteHashSeed + "] route configuration digraph model."
            });
            if (graphFactoryResponse.error) {
                errors.unshift(graphFactoryResponse.error);
                break;
            }

            var routeGraph = graphFactoryResponse.result;
            var routeToRouteHashMap = {};
            var routeHashToRouteMap = {};
            var providerDependenciesMap = {};

            const routeDirectory = request_.projectConfig.dirs.input.routes;

            var workQueue = [ { targetDirectory: routeDirectory, parentRouteHash: undefined } ];

            while (workQueue.length) {

                // Get the next directory to examine.
                var workOrder = workQueue.shift();

                var directory = workOrder.targetDirectory;
                var primaryRoute = '/' + PATH.relative(routeDirectory, directory);

                // Always return 8-character hex code of the 32-bit integer route hash.
                var primaryRouteHash = ARCCORE.identifier.hash.fromUTF8(siteHash + ":" + primaryRoute).toString(16);
                var zeros = Math.max(8 - primaryRouteHash.length, 0);
                while (zeros-- > 0) {
                    primaryRouteHash = "0" + primaryRouteHash;
                }

                var routeLoaderResponse = loadRouteDirectoryConfig.request({
                    sourcesDirectory: directory,
                    primaryRoute: primaryRoute,
                    primaryRouteHash: primaryRouteHash
                });

                if (routeLoaderResponse.error) {
                    errors.unshift(routeLoaderResponse.error);
                    break;
                }

                var routeConfigDescriptor = routeLoaderResponse.result;

                var providers = routeConfigDescriptor.routeConfig.providers;

                for (var provider in providers) {
                    if (!providerDependenciesMap[provider]) {
                        providerDependenciesMap[provider] = [ routeConfigDescriptor.primaryRouteHash ];
                    } else {
                        providerDependenciesMap[provider].push(routeConfigDescriptor.primaryRouteHash);
                    }
                }

                routeGraph.addVertex({
                    u: primaryRouteHash,
                    p: routeLoaderResponse.result
                });

                if (workOrder.parentRouteHash) {
                    routeGraph.addEdge({ e: { u: workOrder.parentRouteHash, v: primaryRouteHash }});
                };

                routeToRouteHashMap[primaryRoute] = primaryRouteHash;
                routeHashToRouteMap[primaryRouteHash] = primaryRoute;

                // Enumerate subdirectories.
                var enumerateResponse = ARCTOOLS.fileDirEnumSync.request({
                    directory: directory,
                    recursive: false
                });
                if (enumerateResponse.error) {
                    errors.unshift(enumerateResponse.error);
                    break;
                }

                var subdirectories = enumerateResponse.result.subdirectories;
                while (subdirectories.length) {
                    var subdirectory = subdirectories.shift();
                    workQueue.push({ targetDirectory: subdirectory, parentRouteHash: primaryRouteHash });
                }

            } // while workQueue.length

            if (errors.length) {
                break;
            }

            response.result = {
                routeHashGraph: routeGraph,
                routeHashToRouteMap: routeHashToRouteMap,
                routeToRouteHashMap: routeToRouteHashMap,
                routeProvidersMap: providerDependenciesMap
            };

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

