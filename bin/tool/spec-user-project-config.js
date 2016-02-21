////
// spec-user-project-config.js
//

module.exports = {
    ____label: "Project Config Descriptor (input)",
    ____description: "Developer-defined project configuration descriptor object input.",
    ____types: "jsObject",
    dirs: {
        ____label: "Directory Paths",
        ____description: "Input and output paths used by the project build and runtime.",
        ____types: "jsObject",
        ____defaultValue: {},
        input: {
            ____label: "Input Directories",
            ____description: "Input directory paths.",
            ____types: "jsObject",
            ____defaultValue: {},
            routes: {
                ____label: "Routes Input Directory",
                ____description: "Directory path to be used for locating sources for building pages.",
                ____accept: "jsString",
                ____defaultValue: "./SOURCES/routes"
            }
        },
        output: {
            ____label: "Output Directories",
            ____description: "Output directory paths.",
            ____types: "jsObject",
            ____defaultValue: {},
            client: {
                ____label: "Client Application Directory",
                ____description: "Directory where the generated HTML5 client application should be written.",
                ____accept: "jsString",
                ____defaultValue: "./BUILD/client"
            },
            server: {
                ____label: "Server Application Directory",
                ____description: "Directory where the generated Node.js application should be written.",
                ____accept: "jsString",
                ____defaultValue: "./BUILD/server"
            },
            cache: {
                ____label: "Builder Cache Directory",
                ____description: "Directory where the build process stores intermediate files and logs useful for debugging.",
                ____accept: "jsString",
                ____defaultValue: "./BUILD/cache"
            }
        }
    },
    org: {
        ____label: "Organization Descriptor",
        ____description: "Information about your organization.",
        ____types: "jsObject",
        ____defaultValue: { name: "Encapsule.io", location: "Bellevue, WA USA", email: "cdr@encapsule.io" },
        seed: {
            ____label: "Organization Hash Seed",
            ____description: "Private string value used as a seed to route hash algorithm.",
            ____types: "jsString"
        },
        name: {
            ____label: "Organization Name",
            ____description: "The name of your company, organization, or group.",
            ____accept: "jsString"
        },
        location: {
            ____label: "Organization Location",
            ____description: "The location of your organization.",
            ____accept: "jsString"
        },
        url: {
            ____label: "Site Base URL",
            ____description: "Link to your organization's website.",
            ____accept: "jsString",
            ____defaultValue: "https://mysite.com"
        },
        email: {
            ____label: "Organization E-mail",
            ____description: "Public admin contact e-mail for your organization.",
            ____accept: "jsString",
            ____defaultValue: "admin@mysite.com"
        }
    },
    site: {
        ____label: "Site Descriptor",
        ____description: "Information about this specific website.",
        ____types: "jsObject",
        ____defaultValue: {},
        seed: {
            ____label: "Site Hash Seed",
            ____description: "Private string value used as a seed to route hash algorithm.",
            ____types: "jsString"
        },
        url: {
            ____label: "Site Base URL",
            ____description: "The base URL this website will be published at.",
            ____accept: "jsString",
            ____defaultValue: "https://mysite.com"
        },
        title: {
            ____label: "Site Title",
            ____description: "A short site title (used in the Browser title bar)",
            ____accept: "jsString",
            ____defaultValue: "My Site"
        },
        description: {
            ____label: "Site Description",
            ____description: "A description of this website (added to every page's meta tags).",
            ____accept: "jsString",
            ____defaultValue: "Please add a description of your website."
        }
    },
    providers: require('./spec-user-providers-context')
};
