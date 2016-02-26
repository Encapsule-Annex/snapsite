// horzmenubar.jsz

const React = require('react');
const HorizontalMenuItem = require('./horzmenuitem.jsx');

// snapsite page context via this.props
// + this.props.parentRoute
// + this.props.selectedRoute
// if selected route is the parent route -> children unselected
// if selected route is neither the parent nor descendent -> same as above
// if selected route is a descendent and it's a child -> children with select
// if selected route is a descendent but not a child -> children with active

module.exports = React.createClass({
    className: 'HorizontalMenuBar',
    render: function() {

        console.log(this.props.parentRoute + ";;;;" + this.props.selectedRouteHash);


        var parentRouteHash = this.props.lookup.routeToRouteHashMap[this.props.parentRoute];
        if (parentRouteHash === undefined) {
            return(<div>HorizontalMenuBar unknown parent route '{this.props.parentRoute}' not in site.</div>);
        }
        var parentRouteProps = this.props.pagesGraph.getVertexProperty(parentRouteHash);
        if (parentRouteProps === undefined) {
            return(<div>HorizontalMenuBar invalid parent route '{this.props.parentRoute}' has no addressable page defined.</div>);
        }

        var selectedRoute = this.props.lookup.routeHashToRouteMap[this.props.selectedRouteHash];
        if (selectedRoute === undefined) {
            return (<div>HorizontalMenuBar unknown selected route hash '{this.props.selectedRouteHash}' not in site.</div>);
        }
        var selectedRouteProps = this.props.pagesGraph.getVertexProperty(this.props.selectedRouteHash);
        if (selectedRouteProps === undefined) {
            return (<div>HorizontalMenuBar invalid selected route hash '{this.props.selectedRouteHash}' has no addressable page defined.</div>);
        }

        var childRouteHashes = parentRouteProps.children;

        if (!childRouteHashes.length) {
            return(<div>No dog gamn children</div>);
        }

        var childMenuItems = [];

        for (var childRouteHash of childRouteHashes) {

            childMenuItems.push(<HorizontalMenuItem {...this.props} targetRouteHash={childRouteHash} selectedRouteHash={this.props.selectedRouteHash} />);

        }

        return (<div>{childMenuItems}</div>);

    }
});
