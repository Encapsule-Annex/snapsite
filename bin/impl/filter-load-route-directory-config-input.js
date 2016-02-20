// filter-process-route-directory-input.js

module.exports = {
    ____label: "Route Directory Loader Request",
    ____description: "Information required to load developer-defined sources from a project input 'route' directory.",
    ____types: "jsObject",
    primaryRoute: {
        ____label: "Primary Route",
        ____description: "The primary route path that will be used externally to reference the resource modeled by the contents of the sources directory.",
        ____accept: "jsString"
    },
    primaryRouteHash: {
        ____label: "Primary Route Hash",
        ____description: "A hash string used internally as an alias for the primary route.",
        ____accept: "jsString"
    },
    sourcesDirectory: {
        ____label: "Sources Directory",
        ____description: "The filesystem path of the directory to load the route resources from.",
        ____accept: "jsString"
    }
};

