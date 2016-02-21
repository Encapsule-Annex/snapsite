// filter-create-webpack-config.js

var ARCCORE = require('arccore');
var PATH = require('path');
var FS = require('fs');

var inputFilterSpec = require('./spec-webpack-config-create-request');

var factoryResponse = ARCCORE.filter.create({
    operationID: "-Dp-onZfQdW8hMgNN0rEjw",
    operationName: "Webpack Config Descriptor Constructor",
    operationDescription: "Generates a webpack configuration descriptor object.",

    inputFilterSpec: inputFilterSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            const providerLoaderRequest = request_.providerLoadRequest;
            const projectManifest = providerLoaderRequest.projectManifest;

            console.log("This is webpack config generator and I think I'm installed in directory " + __dirname);


            var webpackConfig = {
                target: request_.options.target,
                resolveLoader: {
                    modulesDirectories: [
                        PATH.join(__dirname, "../../node_modules")
                    ]
                }
            };

            if (request_.options.externals.length) {

                var nodeModulesPath = PATH.join(__dirname, "../../node_modules");

                webpackConfig.externals = FS.readdirSync(nodeModulesPath).filter(function(packageName) {
                    // Identify external dependencies installed in 'node_modules' directory.
                    // Webpack will not pack these external modules. So, any package that we
                    // do actually want bundled in the packed output needs to be dropped
                    // by this filter.
                    var excludeFromPackedOutput = false
                    if (packageName === '.bin') {
                        excludeFromPackedOutput = true;
                    } else {
                        excludeFromPackedOutput = (-1 !== request_.options.externals.indexOf(packageName));
                    }
                    if (excludeFromPackedOutput) {
                        // console.log("Excluding external module '" + packageName + "' from webpack bundle");
                    }
                    return excludeFromPackedOutput;
                });
            }
            // console.log("Webpack externals = " + JSON.stringify(webpackConfig.externals));

            webpackConfig.entry = {};

            // Extract the page source directories from the project descriptor's page map.
            for (var routeHash of providerLoaderRequest.routeHashes) {
                var routeDescriptor = projectManifest.routeConfig.routeHashGraph.getVertexProperty(routeHash);
                var entryPointScript = (request_.options.target === 'node')?
                    PATH.join(routeDescriptor.sourcesDirectory, '__server-entry.jsx')
                    :
                    //PATH.join(routeDescriptor.sourcesDirectory, 'index.js');
                    PATH.join(routeDescriptor.sourcesDirectory, '__client-entry.jsx');

                webpackConfig.entry[routeHash] = entryPointScript;
            }

            var outputDir = (request_.options.target === 'node')?
                projectManifest.projectConfig.dirs.output.server
                :
                projectManifest.projectConfig.dirs.output.client;

            // In practice I'm splitting the client/server output dirs.
            // var suffix = (request_.options.target === 'node')?'server-view-render':'app';
            var libraryType = (request_.options.target === 'node')?'commonjs2':'umd';

            webpackConfig.output = {
                filename: '[name]' + '.js',
                chunkFilename: '[id]' + '.js',
                path: outputDir,
                libraryTarget: libraryType
            };

            webpackConfig.module = {
                loaders: [
                    {
                        test: /\.jsx$/,
                        loader: 'babel-loader',
                        query: {
                            presets: [ 'react', 'es2015' ]
                        }
                    }
                ]
            };

            // Re-enable when we get to optimizing the bundles.
            webpackConfig.plugins = [
                // new WEBPACK.optimize.CommonsChunkPlugin(...)
                // new WEBPACK.optimize.DedupePlugin()
            ];

            response.result = webpackConfig;
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

