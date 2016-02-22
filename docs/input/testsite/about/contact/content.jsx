

const COMMON = require('./__snaprt.jsx');
const ARCCORE = COMMON.arccore;
const React = COMMON.react;
const ReactTheme = COMMON.reactTheme;

var rootComponent = React.createClass({
render: function() {
    var timestring = new Date().getTime();
    var datestring = new Date().toString();
    var irut = ARCCORE.identifier.irut.fromReference(timestring).result
    return (<div>
            <h2>{irut}</h2>
            <p>It's now {datestring}</p>
            <p>Blah blah blah contact info...</p>
            </div>
    )}
});

module.exports = rootComponent;
