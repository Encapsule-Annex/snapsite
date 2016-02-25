// externallink.jsx

const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const Glyphicon = ReactBootstrap.Glyphicon;

var ExternalLink = React.createClass({
    className: "ExternalLink",
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
        const title = this.props.title;
        const targetUrl = this.props.target;
        const tooltip = this.props.tooltip?this.props.tooltip:"Follow link...";
        var linkStyles = this.props.site.context.theme[this.state.loading?'xlinkLoading':(this.state.hover?'xlinkHover':'xlink')];
        return(<a href={targetUrl} title={tooltip} style={linkStyles} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.clickLink}><Glyphicon glyph='link' style={{fontSize: '8pt', color: '#CCC'}} />{title}</a>);
    }
});

module.exports = ExternalLink;
