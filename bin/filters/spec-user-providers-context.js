// spec-user-providers-context.js

// Specifies build-time context data to be passed through to specified
// build provider subsystems. Currently, a dependency of project and route config.

module.exports = {
    ____label: "Resource Provider Context Map",
    ____description: "A map indexed by provider subsystem name of context data to be passed to specific provider(s) associated with this route.",
    ____types: "jsObject",
    ____asMap: true,
    ____defaultValue: { ReactJS: {} },
    providerContext: {
        ____label: "Resource Provider Context",
        ____description: "An data context object passed through to indicated resource provider subsystem.",
        ____accept: "jsObject"
    }
};

