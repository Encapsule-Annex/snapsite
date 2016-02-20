// spec-html-page-compiler-request.js

module.exports = {
    ____label: "HTML Page Compiler Request",
    ____types: "jsObject",
    handlebarsTemplate: {
        ____label: "Compiled Handlebars Template",
        ____accept: "jsFunction"
    },
    routeHash: {
        ____label: "Route Hash",
        ____description: "Route hash string used to select the page to render.",
        ____accept: "jsString"
    },
    projectManifest: { ____accept: "jsObject" },
    pagesDataContext: { ____accept: "jsObject" }
};


