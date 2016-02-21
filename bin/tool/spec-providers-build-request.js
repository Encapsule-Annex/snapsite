// spec-providers-build-request.js (all providers)

const projectManifestSpec = require('./spec-project-manifest');
const providersExportTableSpec = require('./spec-providers-export-table');

/*
  Passed to top-level provider builder filter.
*/

module.exports = {
    ____label: "Route Providers Build Request",
    ____types: "jsObject",
    projectManifest: projectManifestSpec,
    providers: providersExportTableSpec,
    providersConfigMap: {
        ____accept: "jsObject"
    },
    callback: {
        ____label: "Completion Callback Function",
        ____description: "Function to be called back when this asynchronous operation completes.",
        ____accept: "jsFunction"
    }
};
