// filter-compile-webpack-bundles.js

const ARCCORE = require('arccore');
const PATH = require('path');
const FS = require('fs');
const MKDIRP = require('mkdirp');
const WEBPACK = require('webpack');

const jsonLoader = require('json-loader');
const projectManifestSpec = require('./spec-project-manifest');

var factoryResponse = ARCCORE.filter.create({
    operationID: "bWAL-18jTJO9i6RO9hL4Zg",
    operationName: "Webpack Bundle Compiler",
    operationDescription: "Compiles a set of packed JavaScript bundles via webpack.",

    inputFilterSpec: {
        ____label: "Webpack Bundle Compiler Request",
        ____types: "jsObject",
        projectManifest: projectManifestSpec,
        webpackConfig: {
            ____label: "Webpack Config Object",
            ____accept: "jsObject"
        },
        callback: {
            ____label: "Completion Callback",
            ____accept: "jsFunction"
        }
    },

    outputFilterSpec: {
        ____label: "Compiled Webpack Config",
        ____description: "A successfully compiled webpack configuration object.",
        ____accept: "jsObject"
    },

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            MKDIRP.sync(request_.webpackConfig.output.path);

            ////
            // EXECUTE WEBPACK
            var webpackCompiler = WEBPACK(request_.webpackConfig);
            var webpackCompletion = function(err, stats) {
                // Sort errors and warnings.
                // Likely we'll want to improve this with some sort of options-driven policy.
                if (err) {
                    console.log("FATAL ERROR IN WEBPACK COMPILE REQUEST: " + err.toString());
                    process.exit(1);
                }
                var jsonStats = stats.toJson();
                if (jsonStats.errors.length) {
                    console.log("FATAL ERROR DURING WEBPACK COMPILE: " + jsonStats.errors);
                    process.exit(1);
                }
                if (jsonStats.warnings.length) {
                    console.log("WARINGS DURING WEBPACK COMPILE: " + jsonStats.warnings);
                    process.exit(1);
                }

                // Callback the caller's completion routine.
                if (request_.callback) {
                    request_.callback(err, stats);
                }

            };
            // Generate JavaScript bundle via webpack/babel/react.
            webpackCompiler.run(webpackCompletion);

            // EXECUTE WEBPACK
            ////

            response.result = request_.webpackConfig;

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
