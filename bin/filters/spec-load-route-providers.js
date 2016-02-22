// spec-load-route-providers.js

const projectManifestSpec = require('./spec-project-manifest');
const providersExportTableSpec = require('./spec-providers-export-table');

module.exports = {
    ____label: "Load Route Providers Request",
    ____types: "jsObject",
    projectManifest: projectManifestSpec,
    providers: providersExportTableSpec,
    callback: {
        ____accept: "jsFunction"
    }
};

