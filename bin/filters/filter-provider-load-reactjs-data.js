
var ARCCORE = require('arccore');

var factoryResponse = ARCCORE.filter.create({
    operationID: "golkNZWUTxyYNe3FDa3r8w",
    operationName: "ReactJS Data Context Generator",
    operationDescription: "Generates a JSON descriptor object for each primary ReactJS route.",

    outputFilterSpec: require('./spec-reactjs-pages-data'),

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            const projectManifest = request_.projectManifest;
            const projectConfig = projectManifest.projectConfig;
            const routeConfig = projectManifest.routeConfig;
            const routeHashGraph = routeConfig.routeHashGraph;
            const routeHashes = request_.routeHashes;

            // Verify assumptions about the route hash graph.
            if (routeHashGraph.rootVerticesCount() !== 1) {
                errors.unshift("Invalid route hash graph has more than one root vertex.");
                break;
            }

            var rootRouteHash = routeHashGraph.getRootVertices()[0];
            var rootRouteDescriptor = routeHashGraph.getVertexProperty(rootRouteHash);
            if (request_.routeHashes.indexOf(rootRouteHash) === -1) {
                errors.unshift("By convention, the root route of your site must be associated with the ReactJS provider.");
                break;
            }

            // Create a new digraph container for the filtered context data exposed to ReactJS apps.
            var graphFactoryResponse = ARCCORE.graph.directed.create({
                name: "ReactJS UX Route Graph",
                description: "A directed graph model of " + projectConfig.site.name + " routes mapped to ReactJS UX."
            });
            if (graphFactoryResponse.error) {
                errors.unshift(graphFactoryResponse.error);
                break;
            }
            var pagesGraph = graphFactoryResponse.result;
            var pagesContext = {};

            for (var routeHash of routeHashes) {

                var thisRouteDescriptor = routeHashGraph.getVertexProperty(routeHash);
                var thisRouteConfig = thisRouteDescriptor.routeConfig;

                // Sort the children by rank (useful for building menus).
                var children = [];
                var outEdges = routeHashGraph.outEdges(routeHash);
                for (var edge of outEdges) {
                    if (-1 === routeHashes.indexOf(edge.v))
                        continue; // skip routes not bound to ReactJS provider
                    console.log(JSON.stringify(edge));
                    var childRouteDescriptor = routeHashGraph.getVertexProperty(edge.v);
                    var childRank = childRouteDescriptor.routeConfig.rank;
                    console.log(" child " + edge.v + " rank=" + childRank);
                    if (children[childRank] === undefined) {
                        children[childRank] = {};
                    }
                    children[childRank][childRouteDescriptor.routeConfig.title] = edge.v;
                }

                var childrenFinal = []
                var index = 0;

                while (index < children.length) {
                    if (children[index] !== null) {
                        for (var key in children[index]) {
                            childrenFinal.push(children[index][key]);
                        }
                    }
                    index++;
                }

                var pageContext = {
                    primaryRouteHash: thisRouteDescriptor.primaryRouteHash,
                    primaryRoute: thisRouteDescriptor.primaryRoute,
                    title: thisRouteConfig.title,
                    description: thisRouteConfig.description,
                    tooltip: thisRouteConfig.tooltip,
                    rank: thisRouteConfig.rank,
                    children: childrenFinal,
                    ts: thisRouteDescriptor.ts
                };
                pagesGraph.addVertex({ u: routeHash, p: pageContext });
                pagesContext[routeHash] = thisRouteConfig.providers.ReactJS;

                // Conditionally create an edge from the parent vertex iff
                // it's also associated with the ReactJS provider subsystem.
                if (routeHashGraph.inDegree(routeHash)) {
                    var inEdge = routeHashGraph.inEdges(routeHash)[0]; // always a tree
                    if (request_.routeHashes.indexOf(inEdge.u) !== -1) {
                        pagesGraph.addEdge({ e: { u: inEdge.u, v: routeHash } });
                    } else {
                        errors.unshift("Primary route '" + routeContext.primaryRouteHash + "' " +
                                       "parent route is not associated with the ReactJS provider as required.");
                        errors.unshift("Error processing primary route '" + routeContext.primaryRoute + "'.");
                        return false;
                    }
                }
            }

            if (errors.length) {
                break;
            }
            response.result =  {
                org: projectConfig.org,
                site: projectConfig.site,
                generator: projectConfig.generator,
                pagesGraph: pagesGraph,
                pagesContext: pagesContext
            };
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
