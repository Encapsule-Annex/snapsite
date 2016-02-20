// spec-providers-export-table.js

// providers
module.exports = {
    ____label: "Provider Filters Export Map",
    ____description: "A map of provider modules.",
    ____types: "jsObject",
    ____asMap: true,
    providerFilters: {
        ____label: "Provider Implementation Filters",
        ____types: "jsObject",
        load: {
            ____label: "Load Provider Filter",
            ____accept: "jsObject"
        },
        build: {
            ____label: "Build Provider Filter",
            ____accept: "jsObject"
        }
    }
};
