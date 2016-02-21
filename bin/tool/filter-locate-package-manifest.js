
const ARCTOOLSLIB = require('arctools');
const ARCCORE = ARCTOOLSLIB.arccore;
const PATH = require('path');
const FS = require('fs');

var factoryResponse = ARCCORE.filter.create({

    operationID: "YUojtYAdTNKx4jBnY0d9cw",
    operationName: "Package Manifest Path Locator",
    operationDescription: "Located 'package.json' in the search directory or one of its parent directories.",

    inputFilterSpec: {
        ____label: "Search Directory",
        ____description: "Optional path to the search start directory (default: cwd).",
        ____types: [ "jsUndefined", "jsString" ]
    },

    outputFilterSpec: {
        ____label: "Package Manifest Locator Result",
        ____description: "Directory and filename of a project's package.json manifest.",
        ____types: "jsObject",
        projectRootDirectory: {
            ____label: "Project Root Directory",
            ____description: "The root directory path of the project (contains project's package.json).",
            ____accept: "jsString"
        },
        packageManifestPath: {
            ____label: "Package Manifest Path",
            ____description: "The path to package manifest (package.json) located in the search directory or one of its parent directories.",
            ____accept: "jsString"
        }
    },

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;
            var searchDirectory = request_?request_:process.cwd();
            while (!errors.length && response.result === null) {
                var testPath = PATH.join(searchDirectory, 'package.json');
                try {
                    if (FS.statSync(testPath).isFile()) {
                        console.log("Found package manifest at '" + testPath);
                        response.result = {
                            projectRootDirectory: searchDirectory,
                            packageManifestPath: testPath
                        };
                        break;
                    }
                } catch (error_) {
                    // error to /dev/null
                    if (searchDirectory === '/') {
                        errors.unshift("Unable to locate package.json in folder '" + process.cwd() + "' or its parent directories. Giving up.");
                    }
                    searchDirectory = PATH.join(searchDirectory, '../');
                }
            }
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
