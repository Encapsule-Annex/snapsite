////
// missing-content-render.jsx

const ARCCORE = require('arccore');
const React = require('react');

var MissingContentRender = React.createClass({
    className: "MissingContentRender",
    render: function() {
        var boxStyles = {
            margin: '1em',
            padding: '1em',
            backgroundColor: "#FFCC99",
            border: "5px solid red",
            fontFamily: "Courier",
            fontSize: "10pt",
        };

        return (<div style={boxStyles}>
                <h2>Missing content.jsx</h2>
                <p><strong>Cannot display page-specific content for '{this.props.page.primaryRouteHash}' on route '{this.props.page.primaryRoute}'.</strong></p>
                <p>Please create the file <strong>'content.jsx'</strong> in the route input directory, and rebuild the site to correct this problem.</p>
                </div>
               );
    }
});

module.exports = MissingContentRender;
