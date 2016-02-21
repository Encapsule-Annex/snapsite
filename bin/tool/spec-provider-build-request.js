// spec-provider-build.request.js

const projectManifestSpec = require('./spec-project-manifest');
const providersExportTableSpec = require('./spec-providers-export-table');

module.exports = {
    ____label: "Provider Build Request",
    ____types: "jsObject",

    projectManifest: projectManifestSpec,
    providers: providersExportTableSpec,
    providerConfig: {
        ____label: "Provider Configuration",
        ____accept: "jsObject"
    },
    routeHashes: {
        ____types: "jsArray",
        routeHash: { ____types: "jsString" }
    },
    callback: {
        ____label: "Completion Callback Function",
        ____description: "Function to be called back when this asynchronous operation completes.",
        ____accept: "jsFunction"
    }
};

