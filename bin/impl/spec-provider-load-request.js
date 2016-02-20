var projectManifestSpec = require('./spec-project-manifest');

module.exports = {
    ____label: "Provider Loader Request",
    ____types: "jsObject",
    projectManifest: projectManifestSpec,
    routeHashes: {
        ____label: "Route Hashes Array",
        ____types: "jsArray",
        routeHash: {
            ____label: "Route Hash String",
            ____accept: "jsString"
        }
    }
};
