
const React = require('react');

module.exports = React.createClass({
    render: function() {

        var timestamp = new Date().getTime();

        return (<div>
                <h3>Hey, man!</h3>
                <h1>The current time is {timestamp}</h1>
                <p>{this.props.page.context.testData}</p>
                </div>
               );
    }
});
