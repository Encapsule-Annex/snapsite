////
// sitemap.jsx - renders a simple sitemap indicating the
// currently selected page if a route hash is specified
// via React props.

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
        var renderRoute = function(route_, rank_) {
            var children = [];
            var routeProps = pagesGraph.getVertexProperty(route_);
            children = routeProps.children.map(function(r_) { return renderRoute(r_, rank_+1); });

            var indentStyle = {
                paddingLeft: '' + (rank_/2) + 'em',
                marginLeft: '0px'
            }
            return (<div key={"list"+route_} style={indentStyle}><span>
                    <RouteHashLink {...self.props} routeHash={route_} active={route_ === routeHash} />
                    {' - '}{routeProps.description}{children}
                    </span></div>
                   );
        } // end renderRoute
        // render the sitemap recursively.
        return (<div>{renderRoute(pagesGraph.getRootVertices()[0],0)}</div>);
        rankLevel++;
    }
});

module.exports = Sitemap;

