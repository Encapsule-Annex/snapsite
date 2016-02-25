// copyright.jsx

const React = require('react');
const ExternalLink = require('./externallink.jsx');

const year = new Date().getFullYear();

var Copyright = React.createClass({
    className: "Copyright",
    render: function() {
        const theme = this.props.site.context.theme;
        return (<div style={theme.copyrightBlock}>Copyright &copy; {year}
        {' '}<ExternalLink {...this.props} target={this.props.org.url} title={this.props.org.name + " homepage..."} title={this.props.org.name} />
        {' '}{this.props.org.location}</div>);
    }
});

module.exports = Copyright;

