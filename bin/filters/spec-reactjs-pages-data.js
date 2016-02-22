// spec-reactjs-page-data.js

var projectConfigSpec = require('./spec-norm-project-config');

module.exports = {
    ____label: "ReactJS Pages Context Data",
    ____types: "jsObject",

    org: projectConfigSpec.org,
    site: projectConfigSpec.site,
    generator: projectConfigSpec.generator,
    pagesGraph: {
        ____accept: "jsObject"
    },
    pagesContext: {
        ____types: "jsObject",
        ____asMap: true,
        pageContext: {
            ____accept: "jsObject"
        }
    }
};
