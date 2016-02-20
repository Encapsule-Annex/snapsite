// filter-compile-html-pages.js

const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;
const HANDLEBARS = require('handlebars');
const PATH = require('path');
const clistyle = ARCTOOLS.clistyles;

const inputFilterSpec = require('./spec-html-pages-compiler-request');
const outputFilterSpec = require('./spec-html-pages-compiler-result');

const compileHtmlPage = require('./filter-compile-html-page');

var factoryResponse = ARCCORE.filter.create({
    operationID: "a4bvjb_UQKGDHTgCEiDtJw",
    operationName: "HTML Pages Compiler",
    operationDescription: "Generates an HTML document for each primary route associated with the ReactJS provider subsystem.",

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            // Load the base HTML page handlebars template.
            var filterResponse = ARCTOOLS.jsrcFileLoaderSync.request(PATH.join(__dirname, 'page-template.hbs'));
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                errors.unshift("Unable to load the base HTML5 page template.");
                break;
            }
            var handlebarsTemplate = filterResponse.result.resource;

            // Compile the raw handlebars template into a JavaScript function.
            try {
                handlebarsTemplate = HANDLEBARS.compile(handlebarsTemplate);
            } catch (error_) {
                errors.unshift(error_.toString());
                errors.unshift("Unable to compile base HTML5 page template.");
                break;
            }

            var pageCompilerResults = {};

            var primaryRouteHashes = request_.providerConfig.pagesDataContext.pagesGraph.getVertices();

            for (var routeHash of primaryRouteHashes) {

                var pageCompilerResponse = compileHtmlPage.request({
                    handlebarsTemplate: handlebarsTemplate,
                    projectManifest: request_.projectManifest,
                    pagesDataContext: request_.providerConfig.pagesDataContext,
                    routeHash: routeHash
                });
                if (pageCompilerResponse.error) {
                    errors.unshift(pageCompilerResponse.error);
                    break;
                }

                // Assign pageCompilerResults entry.
                pageCompilerResults[routeHash] = pageCompilerResponse.result;

                // Write the generated document to filesystem.
                var writerResponse = ARCTOOLS.stringToFileSync.request({
                    path: pageCompilerResponse.result.path,
                    resource: pageCompilerResponse.result.document
                });
                if (writerResponse.error) {
                    errors.unshift(writerResponse.error);
                    break;
                }

                var primaryRoute = request_.projectManifest.routeConfig.routeHashToRouteMap[routeHash];

                console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(pageCompilerResponse.result.path) + " for route " + clistyle.dirInput(primaryRoute));

            }
            if (errors.length) {
                break;
            }

            // To simply our integration with webpack, we pack the multiple server and client
            // JavaScript entry point bundles into flat directories using 32-bit Murmur3 hashes
            // (in hex) as the basis of file naming.
            //
            // Write a simple 'index.html' into the generated client output directory so that
            // we can conveniently locate the site's root page when browsing from filesystem
            // (or possibly browsing from GitHub pages).
            siteIndexRouteHash = request_.providerConfig.pagesDataContext.pagesGraph.getRootVertices()[0];
            // Force the browser to immediately retry the request using the route hash of the site's root page.
            var siteIndexRedirect = '<html lang="en"><head><meta http-equiv="refresh" content="0;URL=\'./'+siteIndexRouteHash+'.html\'" /></head></html>';
            var writerResposne = ARCTOOLS.stringToFileSync.request({
                path: PATH.join(request_.projectManifest.projectConfig.dirs.output.client, "index.html"),
                resource: siteIndexRedirect
            });

            response.result = pageCompilerResults;
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
