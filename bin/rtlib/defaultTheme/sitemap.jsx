////
// sitemap.jsx - a simple ReactJS component.
//

const ARCCORE = require('arccore');
const React = require('react');

var Sitemap = React.createClass({
    render: function() {

        var digraph = this.props.pagesGraph;
        var routesCount = digraph.verticesCount();

        var renderRoute = function(route_) {
            var routeProps = digraph.getVertexProperty(route_);
            var outDegree = digraph.outDegree(route_);
            var children = [];
            if (outDegree) {
                var outEdges = digraph.outEdges(route_);
                var adjacent = outEdges.map(function(e) { return e.v; });
                adjacent.forEach(function(r_) {
                    children.push(renderRoute(r_));
                });
            }
            var routeProps = digraph.getVertexProperty(route_);
            if (children.length) {
                return (<ul key={"list"+route_}><li key={route_}><a href={route_ + '.html'}>{routeProps.title}</a> - {routeProps.description}{children}</li></ul>);
            } else {
                return (<ul key={"list"+route_}><li key={route_}><a href={route_ + '.html'}>{routeProps.title}</a> - {routeProps.description}</li></ul>);
            }
        }

        return (<div>{renderRoute(digraph.getRootVertices()[0])}</div>);

    }
});

module.exports = Sitemap;

