const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;
const Markdown = theme.Markdown;
const Heading = theme.SnapHeader;

// Pull in snapsite's README.md as a test.
const mds = require('../../../../README.md');

module.exports = React.createClass({
    render: function() {
        return (<div>
                <Heading {...this.props} heading="snapsite README.md render test" size="1" />
                <Markdown source={mds} />
                </div>
               );


    }
});
