// ======================================================================
/*
  __client-entry.jsx

  Copyright (C) 2016 Encapsule.io

  Main client entry point for snapsite snapsite route '0261711c'.
  This script will be called when the HTML5 document published at
  URL 'http://github.com/Encapsule/snapsite/testsite/new-page' loads in your browser.

  Produced by Encapsule/snapsite v0.0.8 Thu Feb 25 2016 17:28:15 GMT-0800 (PST)
  Site build instance: [1456450095282 8mwgnxfhSGiB_qHlZDZ2PQ]
*/
// ======================================================================

// Load the snapsite runtime library.
const SNAPRT = require('./__snaprt.jsx');

// Alias submodules.
const ARCCORE = SNAPRT.arccore;
const React = SNAPRT.react;
const ReactDOM = SNAPRT.reactDOM;

// Load the React data context prepared by snapsite.
var reactContextData = require('json!./__page-context');

// Convert the serialized pages digraph model into an in-memory graph DB.
var factoryResponse = ARCCORE.graph.directed.create(reactContextData.pagesGraph);
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
// Replace the serialized digraph model with a runtime DirectedGraph container.
reactContextData.pagesGraph = factoryResponse.result;

console.log("snapsite client app initializing on route '/testsite/new-page'...");
console.log("Page [snapsite :: Hello, John] (0261711c) Copyright (C) 2016 Encapsule.io");
console.log("Powered by Encapsule/snapsite v0.0.8 // " +
            "Encapsule/ARC v" + ARCCORE.__meta.version + " // " +
            "Facebook/react v"+ React.version);
console.log("Please follow @Encapsule on Twitter for snapsite news & updates. https://twitter.com/Encapsule");

// Load the developer-defined React component responsible for rendering
// page-specific content from (a) the React data context (b) user input
// (c) local storage (d) communication with remote servers.

var reactContentComponent = require('./content.jsx');

// Specialize the content rendering behavior of <SnapPage>.
reactContextData.renderContent = reactContentComponent;

console.log("... client app context is intitialized.");

var renderPageContent = function() {
    var startTime = new Date().getTime();
    ReactDOM.render(
        React.createElement(SNAPRT.reactTheme.SnapPage, reactContextData),
        document.getElementById('content')
    );
    var endTime = new Date().getTime();
    // console.log("[" + startTime + "] client render completed in " + (endTime - startTime) + " msec.");
};

console.log("... re-rendering the page client-side...");
renderPageContent();

const clientAppEntry = require('/home/cdr/encapsule/snapsite/bin/rtlib/default-client-extension');

console.log("... calling client runtime extension...");
clientAppEntry({
    context: reactContextData,
    renderContent: renderPageContent
});

console.log("> OK: " + reactContextData.generator.agent.name + " v" + reactContextData.generator.agent.version + " client app '" +
            reactContextData.page.primaryRouteHash + "' is running on route '" + reactContextData.page.primaryRoute + "' :)");
console.log("Happy browsing!");



// ======================================================================
