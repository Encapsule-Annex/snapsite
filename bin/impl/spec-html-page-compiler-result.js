// spec-compiled-html-page.js

module.exports = {
    ____label: "Compiled HTML Page Descriptor",
    ____types: "jsObject",

    routeHash: {
        ____label: "Route Hash",
        ____description: "The document's associated route hash string.",
        ____accept: "jsString"
    },

    document: {
        ____label: "HTML Document String",
        ____description: "Generated HTML document as a UTF-8 string.",
        ____accept: "jsString"
    },
    path: {
        ____label: "Suggested Write Path",
        ____description: "Build-generated local filesystem path where the document should be written by the caller.",
        ____accept: "jsString"
    }

};
