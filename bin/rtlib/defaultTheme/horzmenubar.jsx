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

        var keyIndex = 0;
        var self = this;
        var makeKey = function() {
            return "hmb" + self.props.page.ts.d + keyIndex++;
        };

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
            return(<div>Empty menu bar probably should not be rendered...</div>);
        }

        var childMenuItems = [];

        for (var childRouteHash of childRouteHashes) {
            childMenuItems.push(<HorizontalMenuItem {...this.props} targetRouteHash={childRouteHash} selectedRouteHash={this.props.selectedRouteHash} key={makeKey()}/>);
        }

        var depth = parentRouteProps.ts.d + 1;
        var shadeFactor = depth * 5;
        var component = 255 - shadeFactor;
        var color = '#' + ((component << 16) + (component << 8) + component).toString(16);

        console.log("Color string we calculated was " + color);

        var styles = {
            backgroundColor: color,
            boxShadow: '0px 1px 1px #CCC inset',
            padding: '0.5em',
            paddingRight: '1em',
            textAlign: 'left'
        };

        return (<div style={styles}>{childMenuItems}</div>);

    }
});
