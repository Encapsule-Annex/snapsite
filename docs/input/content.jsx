const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;
const Sitemap = theme.Sitemap;

module.exports = React.createClass({
    render: function() {
        return (<div>
               <Sitemap {...this.props} routeHash={this.props.page.primaryRouteHash} />
               </div>
               );
    }
});

