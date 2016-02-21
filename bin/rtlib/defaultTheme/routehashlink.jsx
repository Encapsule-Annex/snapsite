////
// routehashlink.jsx

const ARCCORE = require('arccore');
const React = require('react');

var RouteHashLink = React.createClass({

    render: function() {

        var digraph = this.props.pagesGraph;
        var routeHash = this.props.routeHash;
        var active = this.props.active;

        var routeProps = digraph.getVertexProperty(routeHash);

        if (active) {
            return (<span>{routeProps.title}</span>);
        } else {
            return (<a href={"./" + routeHash + ".html"} title={routeProps.tooltip}>{routeProps.title}</a>);
        }
    }

});

module.exports = RouteHashLink;
