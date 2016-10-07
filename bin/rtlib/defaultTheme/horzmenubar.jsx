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

        if (this.props.parentRoute !== undefined) {
            var childRouteHashes = parentRouteProps.children;
        } else {
            var childRouteHashes = [ this.props.pagesGraph.getRootVertices()[0] ];
        }

        if (!childRouteHashes.length) {
            return(<div>Empty menu bar probably should not be rendered...</div>);
        }

        var childMenuItems = [];

        for (var childRouteHash of childRouteHashes) {
            childMenuItems.push(<HorizontalMenuItem {...this.props} targetRouteHash={childRouteHash} selectedRouteHash={this.props.selectedRouteHash} key={makeKey()}/>);
        }
        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }

        var depth = parentRouteProps.ts.d + 1;
        var shadeFactor1 = depth * 2;
        var component1 = 255 - shadeFactor1;
        var color1 = '#' + round((component1/1.25 << 16)  + (component1/1.125 << 8) + component1, 0).toString(16);
        var shadeFactor2 = depth * 3.5;
        var component2 = 255 - shadeFactor2;
        var color2 = '#' + round((component2/1.3 << 16) + (component2/1.14 << 8) + component2, 0).toString(16);

        var styles = {
            backgroundColor: color1,
            boxShadow: '0px 8px 16px 0px ' + color2 + ' inset',
            padding: '0.3em',
            paddingBottom: '0.4em',
            paddingRight: '1em',
            textAlign: 'right',
            verticalAlign: 'center'
        };

        return (<div style={styles}>{childMenuItems}</div>);

    }
});
