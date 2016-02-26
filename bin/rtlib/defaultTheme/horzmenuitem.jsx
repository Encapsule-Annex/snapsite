// horzmenuitem.jsx

const React = require('react');

// snapsite page context via this.props
// + this.props.targetRouteHash
// + this.props.selectedRouteHash
// if selected route is the target route -> children unselected
// if selected route is neither the target nor descendent -> same as above
// if selected route is a descendent and it's a child -> children with select
// if selected route is a descendent but not a child -> children with active

module.exports = React.createClass({
    className: "HorizontalMenuItem",
    render: function() {

        var content = [];

        var keyIndex = 0;
        var makeKey = function() { return ("HorizontalMenuItem"+keyIndex++) };

        if (this.props.lookup === undefined) {
            return(<div>HorizontalMenuItem missing snapsite lookup tables.</div>);
        }

        var targetRouteProps = this.props.pagesGraph.getVertexProperty(this.props.targetRouteHash);
        if (targetRouteProps === undefined) {
            return(<div>HorizontalMenuItem invalid target route '{this.props.targetRouteHash}' has no addressable page defined.</div>);
        }

        var selectedRouteProps = this.props.pagesGraph.getVertexProperty(this.props.selectedRouteHash);
        if (selectedRouteProps === undefined) {
            return (<div>HorizontalMenuItem invalid selected route '{this.props.selectedRouteHash}' has no addressable page defined.</div>);
        }

        var yayyoyo = {
            margin: '0px',
            marginLeft: '0.25em',
            marginRight: '0.25em',
            padding: '0.25em',
            border: '1px solid #DDD',
            backgroundColor: ((this.props.selectedRouteHash === this.props.targetRouteHash)?'#FF0':'#CCC')
        };



        return (<span style={yayyoyo}>{targetRouteProps.title}</span>);
    }
});


