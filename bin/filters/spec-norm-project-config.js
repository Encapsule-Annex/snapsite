// spec-tool-project-config.js

// Defines the data format of a normalized project config descriptor.

const package = require('../../package.json');

const ARCCORE = require('arccore');

const specUserProjectConfig = require('./spec-user-project-config');
var specNormProjectConfig = ARCCORE.util.clone(specUserProjectConfig);

specNormProjectConfig.____label = "Normalized Project Config";
specNormProjectConfig.____description = "Normalized project configuration format.";

specNormProjectConfig.dirs.package = {
    ____label: "Package Directory",
    ____description: "The directory containing this project's package.json file that is used as the basis absolute paths used to access the filesystem.",
    ____accept: "jsString"
};

specNormProjectConfig.paths = {
    ____label: "Build Paths",
    ____description: "Paths used at build time.",
    ____types: "jsObject",
    config: {
        ____label: "Project Config",
        ____description: "The local filesystem path this data structure was derived from.",
        ____accept: "jsString"
    }
};

specNormProjectConfig.site.copyright = {
    ____label: "Copyright Notice",
    ____description: "Auto-generated copyright notice that uses the current year and organization name.",
    ____accept: "jsString"
};

specNormProjectConfig.generator = {
    ____label: "Generator Metadata",
    ____description: "Metadata identitying this site generator.",
    ____types: "jsObject",
    ____defaultValue: {},
    build: {
        ____label: "Build Info",
        ____types: "jsObject",
        ____defaultValue: {},
        time: {
            ____label: "Build Time",
            ____description: "Site generator build time (Epoch).",
            ____accept: "jsNumber",
            ____defaultValue: 0
        },
        date: {
            ____label: "Date String",
            ____description: "Site generator build date (string).",
            ____accept: "jsString",
            ____defaultValue: "[test build not watermarked]"
        },
        hash: {
            ____label: "IRUT Hash",
            ____description: "22-character IRUT hash string of this build.",
            ____accept: "jsString",
            ____defaultValue: "[test build not assigned ID]"
        }
    },
    agent: {
        ____label: "Generator Agent",
        ____types: "jsObject",
        ____defaultValue: {},
        name: {
            ____label: "Generator Name",
            ____accept: "jsString",
            ____defaultValue: package.name
        },
        version: {
            ____label: "Generator Version",
            ____accept: "jsString",
            ____defaultValue: package.version
        }
    }
};

module.exports = specNormProjectConfig;

