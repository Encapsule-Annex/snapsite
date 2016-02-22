// ======================================================================
/*
  __server-entry.jsx

  Copyright (C) 2016 Replace w/your org name

  Server UX render entry entry point for Site Title snapsite route 'f840cd18'.
  This script is called by the snapsite compilation process to pre-render
  HTML5  pages. This script is also leveraged at runtime by the  Node.js
  webserver process for website's that leverage custom server-side business
  logic.

  Produced by Encapsule/snapsite v0.0.5 Sun Feb 21 2016 23:11:30 GMT-0800 (PST)
  Site build instance: [1456125090677 Sh5MP100T96tzoq6vIibEQ]
*/
// ======================================================================

// Load the snapsite runtime library.
const SNAPRT = require('./__snaprt.jsx');
// Alias submodules.
const ARCCORE = SNAPRT.arccore;
const React = SNAPRT.react;
const ReactDOMServer = require('react-dom/server');

// Load the React data context prepared by snapsite.
var reactContextData = require('json!./__page-context');

// Convert the serialized pages digraph model into an in-memory graph DB.
var factoryResponse = ARCCORE.graph.directed.create(reactContextData.pagesGraph);
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
// Replace the serialized digraph model with a runtime DirectedGraph container.
reactContextData.pagesGraph = factoryResponse.result;

// Load the developer-defined React component responsible for rendering
// page-specific content from (a) the React data context (b) user input
// (c) local storage (d) communication with remote servers.
var reactContentComponent = require('./content.jsx');

// Specialize the content rendering behavior of <SnapPage>.
reactContextData.renderContent = reactContentComponent;

module.exports = function() {
    var response = { error: null, response: null };
    var errors = [];
    var inBreakScope = false;
    while (!inBreakScope) {
        inBreakScope = true;
        try {
            response.result = ReactDOMServer.renderToStaticMarkup(
                React.createElement(SNAPRT.reactTheme.SnapPage, reactContextData)
            );
        } catch (error_) {
            errors.unshift(error_.toString());
            errors.unshift("Failed to render '/testsite/new-page' due to error:");
            break;
        }
        break;
    }
    if (errors.length) {
        response.error = errors.join(" ");
    }
    return response;
};
// ======================================================================