////
// sitemap.jsx - a simple ReactJS component.
//

const ARCCORE = require('arccore');
const React = require('react');

const RouteHashLink = require('./routehashlink.jsx');

var Sitemap = React.createClass({
    render: function() {
        var pagesGraph = this.props.pagesGraph;
        var routeHash = this.props.routeHash;
        var routesCount = pagesGraph.verticesCount();
        var self = this;
        // inner render is recursive.
        var renderRoute = function(route_) {
            var children = [];
            var routeProps = pagesGraph.getVertexProperty(route_);
            children = routeProps.children.map(function(r_) { return renderRoute(r_); });
            return (<ul key={"list"+route_}><li key={route_}>
                    <RouteHashLink {...self.props} routeHash={route_} active={route_ === routeHash} />
                    - {routeProps.description}{children}
                    </li></ul>
                   );
        } // end renderRoute
        // render the sitemap recursively.
        return (<div>{renderRoute(pagesGraph.getRootVertices()[0])}</div>);
    }
});

module.exports = Sitemap;

