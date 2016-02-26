const snaprt = require('./__snaprt.jsx');

const React = snaprt.react;
const theme = snaprt.reactTheme;
const HorizontalMenuBar = theme.HorizontalMenuBar;

module.exports = React.createClass({
    render: function() {
        return (<div>
                <p>Are you kidding me?</p>
                <HorizontalMenuBar {...this.props} parentRoute='/' selectedRouteHash={this.props.page.primaryRouteHash} />
                </div>
               );
    }
});
