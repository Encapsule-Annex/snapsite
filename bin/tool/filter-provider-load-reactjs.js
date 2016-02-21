// filter-provider-reactjs.js

const ARCCORE = require('arccore');

const projectManifestSpec = require('./spec-project-manifest');

const providerLoadRequestSpec = require('./spec-provider-load-request');

var pageContextBuilder = require('./filter-provider-load-reactjs-data');
var webpackConfigBuilder = require('./filter-create-webpack-config');

var factoryResponse = ARCCORE.filter.create({
    operationID: "X8pfQvSiT4ShFKIOoez-iQ",
    operationName: "ReactJS Provider Loader",
    operationDescription: "Loads information germane to the ReactJS provider.",

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            var result = {};

            var pageContextBuilderResponse = pageContextBuilder.request(request_);
            if (pageContextBuilderResponse.error) {
                errors.unshift(pageContextBuilderResponse.error);
                break;
            }

            result.pagesDataContext = pageContextBuilderResponse.result;

            var nodeWebpackConfigResponse = webpackConfigBuilder.request({
                providerLoadRequest: request_,
                options: {
                    target: "node",
                    // externals is a list of modules to exclude from the bundle.
                    externals: [ 'react', 'arccore' ] // i.e. do not bundle
                }
                // callback: request_.callback // IGNORED AND SHOULD BE REMOVED
            });
            if (nodeWebpackConfigResponse.error) {
                errors.unshift(nodeWebpackConfigResponse.error);
                break;
            }

            var browserWebpackConfigResponse = webpackConfigBuilder.request({
                providerLoadRequest: request_,
                options: {
                    target: "web",
                    // externals is a list of modules to exclude from the bundle.
                    externals: [] // i.e. bundle everything
                }
                // callback: function(err, stats) { console.log("jsxCompileWebComplete"); }
            });
            if (browserWebpackConfigResponse.error) {
                errors.unshift(browserWebpackConfigResponse.error);
                break;
            }

            result.webpackConfig = {
                node: nodeWebpackConfigResponse.result,
                browser: browserWebpackConfigResponse.result
            };

            response.result = result;
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
