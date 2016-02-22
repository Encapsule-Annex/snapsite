// snapsite-config.js

module.exports = {
    org: {
        name: "Replace w/your org name",
        location: "Repalce w/your org location",
        seed: "replace this with an IRUT"
    },
    site: {
        title: "Site Title",
        description: "A description of your website.",
        seed: "replace this an an IRUT",
    },
    dirs: {
        input: {
            routes: './test/input'
        },
        output: {
            cache: './test/output/cache',
            client: '../snapsite.gh-pages',
            server: './test/output/server'
        }
    }
};
