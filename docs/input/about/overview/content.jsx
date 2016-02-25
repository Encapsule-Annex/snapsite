const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;

module.exports = React.createClass({
    render: function() {
        var version = this.props.generator.agent.version;
        var heading = this.props.generator.agent.name + " task automation overview";
        return(
            <div>
                <theme.SnapHeader {...this.props} heading={heading} size='1'/>
                <p>{this.props.generator.agent.name} v{this.props.generator.agent.version} performs the following tasks in order to generate a website:</p>
                <ul>
                <li>Finds your package.json and checks for an optionally-specified location of the snapsite configuration module (JavaScript CommonJS module)</li>
                <li>Loads your project configuration module</li>
                <li>Enumerates a local directory structure specified in your configuration looking for route config modules</li>
                <li>As route configuration modules are discovered, they are added to an in-memory graph of the site</li>
                <li>The graph is analyzed and page-specific context views produced and serialized into each route input directory served by React JS</li>
                <li>Server and client JavaScript entry point stubs are synthesized and written into each route input directory served by React JS</li>
                <li>Server and client bundles for each route served by React JS are bundled via webpack and babel</li>
                <li>The resultant server-side page render functions are loaded and used to pre-render the body content for all pages using context produced by snapsite from input sources.</li>
                <li>HTML5 pages are generated for each route page from a common template that sets common headers appropriately, includes in the pre-rendered page content from the previous step, and links the page to client-side application bundle JavaScript responsible for client-side UX dynamism.</li>
                </ul>
            </div>

        );

    }
});
