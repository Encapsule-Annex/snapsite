const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;
const Sitemap = theme.Sitemap;
const SnapHeader = theme.SnapHeader;

module.exports = React.createClass({
    render: function() {
        return (<div>
                <SnapHeader {...this.props} heading="Header 1" size={1} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Header 2" size={2} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Header 3" size={3} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Header 4" size={4} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Header 5" size={5} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Header 8" size={6} />
                <p>djskfh  ksjdhfks sdkjf skdjf ksjdf s asdjkf aksjdhf kajsdf auihsdfajsf jljdfjklasd asdf jkladfkl jhasdf a</p>
                <SnapHeader {...this.props} heading="Sitemap" size='2' />
                <Sitemap {...this.props} routeHash={this.props.page.primaryRouteHash} />
                </div>
               );
    }
});

