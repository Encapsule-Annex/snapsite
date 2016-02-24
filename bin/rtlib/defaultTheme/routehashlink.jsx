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
        var rootRoute = (digraph.inDegree(routeHash) === 0);
        var title = rootRoute?this.props.site.title:routeProps.title;
        if (active) {
            return (<span><strong>{title}</strong></span>);
        } else {
            return (<a href={"./" + routeHash + ".html"} title={routeProps.tooltip}>{title}</a>);
        }
    }
});

module.exports = RouteHashLink;
