// filter-normalize-route-config-input.js

module.exports = {
    ____label: "Route Config Descriptor",
    ____description: "An object describing the details of this route.",
    ____types: "jsObject",
    aliases: {
        ____label: "Primary Route Aliases",
        ____description: "An array of absolute route strings to be used as aliases for this route.",
        ____types: "jsArray",
        ____defaultValue: [],
        routeAlias: {
            ____label: "Route Alias",
            ____description: "An absolute route (i.e. full path relative to base URL) to use as an alias for the primary route.",
            ____accept: "jsString"
        }
    },
    title: {
        ____label: "Route Title",
        ____description: "A short title humans will use as a moniker to refer to resource(s) served on this route.",
        ____accept: "jsString",
    },
    description: {
        ____label: "Route Description",
        ____description: "A description of the resource(s) served on this route.",
        ____accept: "jsString",
    },
    tooltip: {
        ____label: "Page Tooltip",
        ____description: "A short tooltip to display when people mouse over links to this page.",
        ____accept: "jsString",
    },
    rank: {
        ____label: "Route Siblings Rank",
        ____description: "Optional integer indicating this page's rank in menu lists relative to its siblings. Note that a negative rank indicates that the page should not be included in generated menu lists at all.",
        ____types: "jsNumber",
        ____defaultValue: 0
    },

    providers: require('./spec-user-providers-context')

};

