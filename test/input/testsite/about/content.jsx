
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
            <p>This is just a placeholder for some actual content.</p>

            </div>
    )}
});

module.exports = rootComponent;
