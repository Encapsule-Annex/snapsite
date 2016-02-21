// copyright.jsx

const ARCCORE = require('arccore');
const React = require('react');

var year = new Date().getFullYear();

var Copyright = React.createClass({
    className: "Copyright",
    render: function() {
        return (<span>Copyright &copy; {year} <a href={this.props.org.url} title={this.props.org.name + " homepage..."} >{this.props.org.name}</a> {this.props.org.location}</span>);
    }
});

module.exports = Copyright;

