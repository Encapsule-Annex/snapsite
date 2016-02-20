// filter-parse-package-manifest.js

const ARCCORE = require('arccore');

const inputFilterSpec = {
    ____label: "Package Manifest JSON",
    ____description: "An object deserialized from 'package.json'.",
    ____types: "jsObject",
    snapsite: {
        ____label: "snapsite Options",
        ____description: "Override default snapsite behaviors.",
        ____types: "jsObject",
        ____defaultValue: {},
        configFile: {
            ____label: "snapsite Configuration Module",
            ____description: "Relative path to the snapsite configuration CommonJS config module.",
            ____accept: "jsString",
            ____defaultValue: "./snapsite-config.js"
        }
    }
};

const outputFilterSpec = inputFilterSpec.snapsite;

var factoryResponse = ARCCORE.filter.create({
    operationID: "acMu3yGIRVWy1OtZKEfXqA",
    operationName: "Project Config Path Extractor",
    operationDecription: "Extracts the path to local snapsite-config.js module from package.json.",
    inputFilterSpec: inputFilterSpec,
    outputFilterSpec: outputFilterSpec,
    bodyFunction: function(request_) {
        return { error: null, result: request_.snapsite };
    }

});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
