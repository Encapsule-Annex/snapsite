
const ARCCORE = require('arccore');
const React = require('react');

var rootComponent = React.createClass({
render: function() {
    var timestring = new Date().getTime();
    var datestring = new Date().toString();
    var irut = ARCCORE.identifier.irut.fromReference(timestring).result
    return (<div>
            <h2>{irut}</h2>
            <p>It's now {datestring}</p>
            <h3>Blog Placeholder</h3>
            <p>This is just some HTML content that I'm writing into the content.jsx component.</p>
            <p>In the short term, the blog feature will be implemented as a custom index over appropriately tagged pages. More on this later...</p>
            </div>

    )}
});

module.exports = rootComponent;
