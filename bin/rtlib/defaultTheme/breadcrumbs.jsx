////
// breadcrumbs.jsx

const ARCCORE = require('arccore');
const React = require('react');

var RouteHashLink = require('./routehashlink.jsx');

var Breadcrumbs = React.createClass({
    render: function() {
        var digraph = this.props.pagesGraph;
        var routeHash = (this.props.routeHash === undefined)?this.props.page.primaryRouteHash:this.props.routeHash;
        var active = (this.props.active === undefined)?true:this.props.active;
        var theme = this.props.site.context.theme;
        var breadcrumbs = [];
        breadcrumbs.push(<RouteHashLink {...this.props} routeHash={routeHash} active={true} key={"breadcrumbs" + routeHash} />);
        while (digraph.inDegree(routeHash) === 1) {
            var inEdges = digraph.inEdges(routeHash);
            routeHash = inEdges[0].u;
            breadcrumbs.unshift(" / ");
            breadcrumbs.unshift(<RouteHashLink {...this.props} routeHash={routeHash} active={false} key={"breadcrumbs" + routeHash} />);
        }
        return (<div style={theme.breadcrumbsBlock}>{breadcrumbs}</div>);
    }
});

module.exports = Breadcrumbs;
