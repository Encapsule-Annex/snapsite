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
const SnapBug = require('./snapsitebug.jsx');

const ReactBootstrap = require('react-bootstrap');
const PageHeader = ReactBootstrap.PageHeader;

const styles = {
    margin: '1em'
};

var SnapPage = React.createClass({
    className: "SnapPage",
    render: function() {

        var keyIndex = 0;
        var keyBase = "SnapPage";
        var makeKey = function() { return (keyBase + keyIndex++); };

        var theme = this.props.site.context.theme;

        var content = [];

        var isRootPage = (this.props.pagesGraph.inDegree(this.props.page.primaryRouteHash) === 0);

        if (isRootPage) {
            content.push(<div key={makeKey()} style={theme.titleBlock}><span style={theme.title}>{this.props.site.title}</span> <span style={theme.subtitle}>- {this.props.page.description}</span></div>);
        } else {
            content.push(<Breadcrumbs {...this.props} key={makeKey()} />);
            content.push(<div key={makeKey()} style={theme.titleBlock}><span style={theme.title}>{this.props.page.title}</span> <span style={theme.subtitle}>- {this.props.page.description}</span></div>)
        }



        var contentRendered = React.createElement(this.props.renderContent, this.props);
        content.push(<div key={makeKey()} style={theme.contentBlock}>{contentRendered}</div>);

        content.push(<Copyright {...this.props} key={makeKey()} style={theme.copyrightBlock} />);
        content.push(<SnapBug {...this.props} key={makeKey()} />);

        return (<div style={theme.pageBlock}>{content}<br /></div>);

    }
});

module.exports = SnapPage;
