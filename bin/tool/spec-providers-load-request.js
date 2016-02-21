// spec-providers-load-request.js

const projectManifestSpec = require('./spec-project-manifest');
const providersExportTableSpec = require('./spec-providers-export-table');

/*
  Passed to top-level providers loader.
*/

module.exports = {
    ____label: "Provider Loader Request",
    ____types: "jsObject",
    providers: providersExportTableSpec,
    projectManifest: projectManifestSpec
};
