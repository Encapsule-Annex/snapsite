
const COMMON = require('./__snaprt.jsx');
const ARCCORE = COMMON.arccore;
const React = COMMON.react;

var rootComponent = React.createClass({

render: function() {
    var timestring = new Date().getTime();
    var datestring = new Date().toString();
    var irut = ARCCORE.identifier.irut.fromReference(timestring).result
    return (<div>
            <h2>{irut}</h2>
            <p>It's now {datestring}</p>

            <h3>Docs Lib Placeholder</h3>
            <p>Similar to the <COMMON.reactTheme.RouteHashLink {...this.props} routeHash={this.props.lookup.routeToRouteHashMap['/testsite/blog']} />,
            the documentation library feature will be a custom index over appropriately tagged pages.</p>

            </div>
    )}
});

module.exports = rootComponent;
