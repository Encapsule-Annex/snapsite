// copyright.jsx

const ARCCORE = require('arccore');
const React = require('react');

const year = new Date().getFullYear();

var Copyright = React.createClass({
    className: "Copyright",
    render: function() {
        const theme = this.props.site.context.theme;
        return (<div style={theme.copyrightBlock}>Copyright &copy; {year} <a href={this.props.org.url} title={this.props.org.name + " homepage..."} >{this.props.org.name}</a> {this.props.org.location}</div>);
    }
});

module.exports = Copyright;

