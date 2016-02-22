// filter-provider-build-reacjs.js

const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;
const PATH = require('path');
const FS = require('fs');
const MKDIRP = require('mkdirp');
const HANDLEBARS = require('handlebars');

const clistyle = ARCTOOLS.clistyles;

const compileWebpackBundles = require('./filter-compile-webpack-bundles');
const compileHtmlPages = require('./filter-compile-html-pages');

const inputFilterSpec = require('./spec-provider-build-request');

var factoryResponse = ARCCORE.filter.create({
    operationID: "DeJG0RHTTN-Nb0-LKHkC-w",
    operationName: "ReactJS Provider Builder",
    operationDescription: "Builds ReactJS HTML5 and JavaScript resources for primary routes associated with the ReactJS provider subsystem.",

    inputFilterSpec: inputFilterSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            console.log(clistyle.processStepHeader(">>> Building ReactJS subsystem routes..."));

            // Result is accumulated over several async operations and ultimately
            // returned to the caller via the final completion callback.
            var result = {
                pages: {
                },
                webpack: {}
            };

            var filterResponse = ARCTOOLS.jsrcFileLoaderSync.request(PATH.join(__dirname, 'client-entry-js.hbs'));
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                errors.unshift("Unable to load client-side entry point JavaScript template.");
                break;
            }
            var clientEntryTemplate = filterResponse.result.resource;
            try {
                clientEntryTemplate = HANDLEBARS.compile(clientEntryTemplate);
            } catch (error_) {
                errors.unshift(error_.toString());
                errors.unshift("Unable to compile client-side entry point JavaScript template.");
                break;
            }

            var filterResponse = ARCTOOLS.jsrcFileLoaderSync.request(PATH.join(__dirname, 'server-entry-js.hbs'));
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                errors.unshift("Unable to load server-side entry point JavaScript template.");
                break;
            }
            var serverEntryTemplate = filterResponse.result.resource;
            try {
                serverEntryTemplate = HANDLEBARS.compile(serverEntryTemplate);
            } catch (error_) {
                errors.unshift(error_.toString());
                errors.unshift("Unable to compile server-side entry point JavaScript template.");
                break;
            }

            // Dereference the "ReactJS data context" produced by the load phase
            // that contains a directed graph containing all the content loaded
            // previously. Here we persist this for debugging purposes and then
            // split it apart by primary route to generate page-specific data
            // context objects that contain the page's content + a stripped out
            // route graph containing only ReactJS subsystem routes to be used
            // by ReactJS components for establishing navigation context, drawing
            // menus and breadcrumbs etc.

            var pagesDataContext = request_.providerConfig.pagesDataContext;
            const sourcesRootDirectory = request_.projectManifest.projectConfig.dirs.input.routes;

            for (var routeHash of request_.routeHashes) {

                var page = ARCCORE.util.clone(pagesDataContext.pagesGraph.getVertexProperty(routeHash));
                page.context = pagesDataContext.pagesContext[routeHash];

                var pageDataContextSerialize = {
                    org: pagesDataContext.org,
                    site: pagesDataContext.site,
                    generator: pagesDataContext.generator,
                    pagesGraph: pagesDataContext.pagesGraph,
                    page: page,
                    lookup: {
                        routeHashToRouteMap: request_.projectManifest.routeConfig.routeHashToRouteMap,
                        routeToRouteHashMap: request_.projectManifest.routeConfig.routeToRouteHashMap
                    }
                };
                pageDataContextSerialize.site.context = request_.projectManifest.projectConfig.providers.ReactJS;

                // Need the primary route to formulate the output filename path.
                var primaryRoute = pagesDataContext.pagesGraph.getVertexProperty(routeHash).primaryRoute;
                var routeSourcePath = PATH.join(sourcesRootDirectory, primaryRoute);
                var routeToRootRelativePath = PATH.join(PATH.relative(routeSourcePath, sourcesRootDirectory), '../');

                // Write the page's data context serialization into the route source directory
                // (i.e. in the same directory as the webpack bundle entrypoint scripts for each
                // page).
                var pageContextPath = PATH.join(routeSourcePath, '__page-context.json');
                writerResponse = ARCTOOLS.stringToFileSync.request({
                    resource: JSON.stringify(pageDataContextSerialize, undefined, 4),
                    path: pageContextPath
                });
                if (writerResponse.error) {
                    errors.unshift(writeResponse.error);
                    break;
                }
                result.pages[routeHash] = { context: pageDataContextSerialize };
                console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(pageContextPath) + " for route " + clistyle.dirInput(primaryRoute));

                // Okay - now we can augment the data context to add data required to build
                // the server and client entry point scripts.

                // pageDataContextSerialize.snapsiteModule = PATH.join(routeToRootRelativePath, 'client-libs');
                pageDataContextSerialize.snapsiteModule = PATH.join(__dirname, '../rtlib');

                var clientRuntimeExtensionPath = PATH.join(routeSourcePath, 'client-runtime.js');
                if (FS.existsSync(clientRuntimeExtensionPath) && FS.statSync(clientRuntimeExtensionPath).isFile()) {
                    pageDataContextSerialize.clientExtensionModule = clientRuntimeExtensionPath;
                } else {
                    // pageDataContextSerialize.clientExtensionModule = PATH.join(routeToRootRelativePath, 'default-client-extension');
                    pageDataContextSerialize.clientExtensionModule = PATH.join(__dirname, '../rtlib/default-client-extension');
                }

                var contentRenderModulePath = PATH.join(routeSourcePath, 'content.jsx');
                if (FS.existsSync(contentRenderModulePath) && FS.statSync(contentRenderModulePath).isFile()) {
                    pageDataContextSerialize.contentRenderModuleLoad = "require('./content.jsx')";
                } else {
                    pageDataContextSerialize.contentRenderModuleLoad = "SNAPRT.reactTheme.MissingContentRender";
                }

                // Synthesize the server-side JavaScript entry point module via Handlebars.
                var serverEntryJavaScript;
                try {
                    serverEntryJavaScript = serverEntryTemplate(pageDataContextSerialize);
                } catch (error_) {
                    errors.unshift
                    errors.unshift(error_.toString());
                    errors.unshift("Failed to generate server-side entry point JSX for route '" + primaryRoute + "':");
                    break;
                }
                var serverEntryJavaScriptPath = PATH.join(request_.projectManifest.projectConfig.dirs.input.routes, primaryRoute, '__server-entry.jsx');
                writerResponse = ARCTOOLS.stringToFileSync.request({
                    resource: serverEntryJavaScript,
                    path: serverEntryJavaScriptPath
                });
                if (writerResponse.error) {
                    errors.unshift(writerResponse.error);
                    errors.unshift("Failed to write server-side entry point JSX for route '" + primaryRoute + "':");
                    break;
                }
                console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(serverEntryJavaScriptPath) + " for route " + clistyle.dirInput(primaryRoute));

                // Synthesize the client-side JavaScript entry point module via Handlebars.
                var clientEntryJavaScript;
                try {
                    clientEntryJavaScript = clientEntryTemplate(pageDataContextSerialize);
                } catch (error_) {
                    errors.unshift
                    errors.unshift(error_.toString());
                    errors.unshift("Failed to generate client-side entry point JSX for route '" + primaryRoute + "':");
                    break;
                }
                var clientEntryJavaScriptPath = PATH.join(request_.projectManifest.projectConfig.dirs.input.routes, primaryRoute, '__client-entry.jsx');
                writerResponse = ARCTOOLS.stringToFileSync.request({
                    resource: clientEntryJavaScript,
                    path: clientEntryJavaScriptPath
                });
                if (writerResponse.error) {
                    errors.unshift(writerResponse.error);
                    errors.unshift("Failed to write client-side entry point JSX for route '" + primaryRoute + "':");
                    break;
                }
                console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(clientEntryJavaScriptPath) + " for route " + clistyle.dirInput(primaryRoute));

            } // end for routeHash of routeHashes

            // Generate CommonJS format server-side view render JavaScript bundles for each primary route.
            console.log(clistyle.processStepHeader(">>> Webpacking server-side page render bundles.."));
            var nodeWebpackResponse = compileWebpackBundles.request({
                projectManifest: request_.projectManifest,
                webpackConfig: request_.providerConfig.webpackConfig.node,
                callback: function(err, stats) {

                    console.log(clistyle.infoBody("... server-side page render bundles compiled."));
                    console.log(clistyle.processStepHeader(">>> Webpacking client-side application bundles..."));

                    // Currently we're assuming forced process exit on error inside the webpack compiler.
                    // Generate client-side application bundles for each primary route.

                    browserWebpackResponse = compileWebpackBundles.request({
                        projectManifest: request_.projectManifest,
                        webpackConfig: request_.providerConfig.webpackConfig.browser,
                        callback: function(err, stats) {

                            console.log(clistyle.infoBody("... client-side application bundles compiled."));
                            console.log(clistyle.processStepHeader(">>> Generating HTML documents..."));

                            // Currently we're assuming forced process exit on error inside the webpack compiler.
                            // Generate HTML documents for each primary route.

                            var pageGeneratorResponse = compileHtmlPages.request({
                                projectManifest: request_.projectManifest,
                                providerConfig: request_.providerConfig
                            });
                            if (pageGeneratorResponse.error) {
                                request_.callback(pageGeneratorResponse.error, null);
                            } else {
                                for (var routeHash_ in pageGeneratorResponse.result) {
                                    result.pages[routeHash_].doc = pageGeneratorResponse.result[routeHash_];
                                }
                                // request_.callback(null, pageGeneratorResponse.result);
                                request_.callback(null, result);
                            }
                        }
                    });
                    if (browserWebpackResponse.error) {
                        errors.unshift(browserWebpackResponse.error);
                    }
                    result.webpack.client = { config: browserWebpackResponse.result };
                }
            });
            if (nodeWebpackResponse.error) {
                errors.unshift(webpackResponse.error);
                break;
            }
            result.webpack.server = { config: nodeWebpackResponse.result };
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        response.result = result;
        return response;
    }
});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
module.exports = factoryResponse.result;
