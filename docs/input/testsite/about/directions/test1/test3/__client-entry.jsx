// ======================================================================
/*
  __client-entry.jsx

  Copyright (C) 2016 Encapsule.io

  Main client entry point for snapsite snapsite route 'a33b3793'.
  This script will be called when the HTML5 document published at
  URL 'http://github.com/Encapsule/snapsite/testsite/about/directions/test1/test3' loads in your browser.

  Produced by Encapsule/snapsite v0.0.8 Sun Feb 28 2016 13:15:42 GMT-0800 (PST)
  Site build instance: [1456694142980 b-OhLcGWQCKRn04_amH3CQ]
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

console.log("snapsite client app initializing on route '/testsite/about/directions/test1/test3'...");
console.log("Page [snapsite :: TEST3] (a33b3793) Copyright (C) 2016 Encapsule.io");
console.log("Powered by Encapsule/snapsite v0.0.8 // " +
            "Encapsule/ARC v" + ARCCORE.__meta.version + " // " +
            "Facebook/react v"+ React.version);
console.log("Please follow @Encapsule on Twitter for snapsite news & updates. https://twitter.com/Encapsule");

// Load the developer-defined React component responsible for rendering
// page-specific content from (a) the React data context (b) user input
// (c) local storage (d) communication with remote servers.

var reactContentComponent = SNAPRT.reactTheme.MissingContentRender;

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
