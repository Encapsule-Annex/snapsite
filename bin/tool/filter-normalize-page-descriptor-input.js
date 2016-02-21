// spec-page-content-descriptor-input.js

module.exports = {
    ____label: "Route Descriptor",
    ____description: "An object that declares meta-data required to generate and route the site's primary pages.",
    ____types: "jsObject",
    title: {
        ____label: "Page Title",
        ____description: "A short title of the page (used in the browser title bar)",
        ____accept: "jsString"
    },
    description: {
        ____label: "Page Description",
        ____description: "A description of this page.",
        ____accept: "jsString"
    },
    tooltip: {
        ____label: "Page Tooltip",
        ____description: "A short tooltip to display when people mouse over links to this page.",
        ____accept: "jsString"
    },
    routes: {
        ____label: "Routes Vector",
        ____description: "An array of page route assignments.",
        ____types: "jsArray",
        ____defaultValue: [],
        route: {
            ____label: "Route String",
            ____description: "A page route assignment.",
            ____accept: "jsString"
        }
    },
    routePeerRank: {
        ____label: "Route Peer Rank",
        ____description: "Order peer pages below common parent route in ascending rank order. Negative rank drops page from generated menus and sitemap.",
        ____accept: "jsNumber",
        ____defaultValue: 0
    },
    routeMethods: {
        ____label: "Route Methods",
        ____description: "An array of HTTP methods the server should provide for this page.",
        ____types: "jsArray",
        ____defaultValue: [ "GET" ],
        httpMethod: {
            ____label: "HTTP Method",
            ____description: "An HTTP method name.",
            ____accept: "jsString",
            ____inValueSet: [ 'OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', "TRACE", "CONNECT" ]
        }
    },
    sourcesDirectory: {
        ____label: "Sources Directory",
        ____description: "The local filesystem directory where this page's sources are stored.",
        ____accept: "jsString",
        ____defaultValue: "<bad/missing pathname>"
    }
};

