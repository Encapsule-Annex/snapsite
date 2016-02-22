// filter-compiler-html-page.js

const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;
const REACT = require('react');
const REACTDOMSERVER = require('react-dom/server');
const PATH = require('path');

const inputFilterSpec = require('./spec-html-page-compiler-request');
const outputFilterSpec = require('./spec-html-page-compiler-result');

var factoryResponse = ARCCORE.filter.create({
    operationID: "cNnAbtZBSAe2mYGIkq5R3w",
    operationName: "HTML Page Compiler",
    operationDescription: "Generates a single HTML document via ReactJS and returns the result as a UTF-8 string.",

    inputFilterSpec: inputFilterSpec,
    outputFilterSpec: outputFilterSpec,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            // Hot-load the server-side ReactJS render function for this route.
            var serverViewRenderPath = PATH.join(
                request_.projectManifest.projectConfig.dirs.output.server,
                request_.routeHash + '.js');
            filterResponse = ARCTOOLS.jsrcFileLoaderSync.request(serverViewRenderPath);
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                errors.unshift("Fatal error loading server-side React JS render module.");
                break;
            }
            var serverViewRenderFunction = filterResponse.result.resource;

            // Dereference the route's context data and clone it.
            var pageContextData = request_.pagesDataContext.pagesGraph.getVertexProperty(request_.routeHash);

            var reactDataContextPath = PATH.join(
                request_.projectManifest.projectConfig.dirs.input.routes,
                pageContextData.primaryRoute, '__page-context.json');
            filterResponse = ARCTOOLS.jsrcFileLoaderSync.request(reactDataContextPath);
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                break;
            }
            var reactDataContext = filterResponse.result.resource;
            // Deserialize the digraph.
            var graphResponse = ARCCORE.graph.directed.create(reactDataContext.pagesGraph);
            if (graphResponse.error) {
                errors.unshift(graphResponse.error);
                break;
            }
            // Re-assign the in-memory digraph container for use locally.
            reactDataContext.pagesGraph = graphResponse.result;
            reactDataContext.contentRender = serverViewRenderFunction;


            // Render (i.e. generate) an UTF8 encode string containing the innerHTML
            // to be inserted into <html><body><div id="content" /></body></html>.
            try {
                //reactDataContext.contentHtml = REACTDOMSERVER.renderToStaticMarkup(
                // REACT.createElement(serverViewRenderFunction, reactDataContext)
                //);

                renderResponse = serverViewRenderFunction();
                if (renderResponse.error) {
                    errors.unshift(renderResponse.error);
                    break;
                }
                reactDataContext.contentHtml = renderResponse.result;

            } catch (error_) {
                errors.unshift(error_.toString());
                errors.unshift("Document generation phase 1 exception in React component render function:");
                errors.unshift("Cannot generate HTML document for route " + reactDataContext.page.primaryRouteHash + " '" + reactDataContext.page.primaryRoute + "'.");
                break;
            }


            // Attempt to compile and render the page document via Handlebars.
            // clientAppBundle is a private variable passed to the outer Handlebars context.
            // ultimately I'm going to drop this and do it all w/React.
            reactDataContext.clientAppBundle = './' + request_.routeHash + '.js';

            try {
                response.result = {
                    routeHash: request_.routeHash,
                    document: request_.handlebarsTemplate(reactDataContext),
                    path: PATH.join(
                        request_.projectManifest.projectConfig.dirs.output.client,
                        request_.routeHash + '.html')
                };
            } catch (error_) {
                errors.unshift(error_.toString());
                errors.unshift("Document generation phase 2 exception in Handlebars template engine:");
                break;
            }
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
