
const COMMON = require('./__snaprt.jsx');
const ARCCORE = COMMON.arccore;
const React = COMMON.react;

const ReactTheme = COMMON.reactTheme;

var renderContent = React.createClass({
    render: function() {
        return (
                <div>
                <p>Since yesterday:</p>
                <ul>
                  <li>Hand-created client and server entry points in route directories are gone. This logic is now generated at build-time.</li>
                  <li>I've created the basis for a powerful theme system that will be super simple to use. Install an npm package, change a line in your config, and recompile will reskin any site generated with {this.props.generator.agent.name}.</li>
                  <li>This little demo uses several basic widgets implemented by the default theme.
                  <ul>
                    <li>breadcrumbs at the top of the page</li>
                    <li>page title</li>
                    <li>sitemap / copyright footer</li>
                    <li>In-site link helpers that abstract the details of URL's (can get tricky). For example: <ReactTheme.RouteHashLink {...this.props} routeHash={this.props.lookup.routeToRouteHashMap['/']} /> links back to the top of the site using a hash signature I don't know off the top of my head. In this case I use the route '/'</li>
                  </ul></li>
                <li>This little demo is a raw copy of the generated client app to github pages (free hosting).</li>
                </ul>

                </div>
               );
    }
});

module.exports = renderContent;

