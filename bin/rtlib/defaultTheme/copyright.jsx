// copyright.jsx

const ARCCORE = require('arccore');
const React = require('react');

const year = new Date().getFullYear();
const styles = { borderTop: '1px solid #DDDDDD', textAlign: 'right', fontSize: '10pt', paddingTop: '0.5em'};


var Copyright = React.createClass({
    className: "Copyright",
    render: function() {
        return (<div style={styles}>Copyright &copy; {year} <a href={this.props.org.url} title={this.props.org.name + " homepage..."} >{this.props.org.name}</a> {this.props.org.location}</div>);
    }
});

module.exports = Copyright;

