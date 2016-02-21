// spec-webpack-config-create-request.js

var providerLoadRequestSpec = require('./spec-provider-load-request');

module.exports = {
    ____label: "Webpack Config Create Request",
    ____types: "jsObject",

    providerLoadRequest: providerLoadRequestSpec,

    options: {
        ____label: "Webpack Config Generator Options",
        ____description: "Options specific to this filter that are used to generate a Webpack configuration object.",
        ____types: "jsObject",

        target: {
            ____accept: "jsString",
            ____inValueSet: [ 'node', 'web' ],
            ____defaultValue: 'web'
        },

        externals: {
            ____label: "External Module Excludes",
            ____description: "Optional array of plain module names to exclude from bundle (resolved in node_modules).",
            ____types: [ "jsArray" ],
            ____defaultValue: [],
            plainModuleName: {
                ____label: "Plain Module Name",
                ____description: "External module name stripped of path.",
                ____accept: "jsString"
            }
        }

    }

};


