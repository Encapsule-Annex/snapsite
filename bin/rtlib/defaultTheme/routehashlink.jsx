////
// routehashlink.jsx

const ARCCORE = require('arccore');
const React = require('react');

var RouteHashLink = React.createClass({
    getInitialState: function() {
        return {
            hover: false,
            loading: false
        };
    },

    toggleHover: function() {
        this.setState({ hover: !this.state.hover});
    },

    clickLink: function() {
        this.setState({ loading: true });
    },

    render: function() {
        var digraph = this.props.pagesGraph;
        var routeHash = this.props.routeHash;
        var active = this.props.active;
        var routeProps = digraph.getVertexProperty(routeHash);
        var rootRoute = (digraph.inDegree(routeHash) === 0);
        var linkStyles = this.props.site.context.theme[this.state.loading?'linkLoading':(this.state.hover?'linkHover':'link')];
        var title = rootRoute?this.props.site.title:routeProps.title;
        if (active) {
            return (<span><strong>{title}</strong></span>);
        } else {
            return (<a href={"./" + routeHash + ".html"} title={routeProps.tooltip} style={linkStyles} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.clickLink}>{title}</a>);
        }
    }
});

module.exports = RouteHashLink;
