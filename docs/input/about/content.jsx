const snaprt = require('./__snaprt.jsx');
const ARCcore = snaprt.arccore;
const React = snaprt.react;

var AboutSnapsite = React.createClass({
    className: "AboutSnapsite",
    render: function() {
        var generator = this.props.generator;
        return (
                <div>
                <h2>site details</h2>
                <p>
                {this.props.pagesGraph.verticesCount()} pages generated on {generator.build.date}.<br />
                Timestamp: {generator.build.time} {"//"} ID: {generator.build.hash}<br />
                </p>
                <h2>generator</h2>
                <p>
                Encapsule/{generator.agent.name} v{generator.agent.version}<br />
                Encapsule/{ARCcore.__meta.name} v{ARCcore.__meta.version}<br />
                Facebook/react v{React.version}
                </p>
                </div>
        );
    }
});

module.exports = AboutSnapsite;
