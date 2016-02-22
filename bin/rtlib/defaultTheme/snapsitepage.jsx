// snapsitepate.jsx

// Generic page content render component draws standard header,
// footer, and navigation chrome common to all site pages. And,
// then delegates to the route's content.jsx component that is
// responsible for rendering the page-specific content.

const React = require('react');
const ARRCORE = require('arccore');

const Breadcrumbs = require('./breadcrumbs.jsx');
const Copyright = require('./copyright.jsx');
const Sitemap = require('./sitemap.jsx');

const styles = {
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '12pt',
    margin: '1em'
};


var SnapPage = React.createClass({
    className: "SnapPage",
    render: function() {

        var keyIndex = 0;
        var keyBase = "SnapPage";
        var makeKey = function() { return (keyBase + keyIndex++); };

        var content = [];

        var isRootPage = (this.props.pagesGraph.inDegree(this.props.page.primaryRouteHash) === 0);

        if (isRootPage) {
            content.push(<h1 key={makeKey()}>{this.props.site.title}</h1>);
        } else {
            content.push(<Breadcrumbs {...this.props} key={makeKey()} />);
            content.push(<h1 key={makeKey()}>{this.props.page.title}</h1>);
            content.push(<p key={makeKey()}><i>{this.props.page.description}</i></p>);
        }


        var contentRendered = React.createElement(this.props.renderContent, this.props);
        content.push(<span key={makeKey()}>{contentRendered}</span>);

        content.push(<hr key={makeKey()} />);
        content.push(<Sitemap {...this.props} key={makeKey()} />);

        content.push(<Copyright {...this.props} key={makeKey()} />);

        return (<div style={styles}>{content}</div>);

    }
});

module.exports = SnapPage;
