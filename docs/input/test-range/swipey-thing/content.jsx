
const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;
const ReactBootstrap = theme.ReactBootstrap;
const Button = ReactBootstrap.Button;

const LUT = {
    0: "image0",
    1: "image1"
}

module.exports = React.createClass({
    className: "SwipeyThing",

    getInitialState: function() {
        return {
            item: 0
        };
    },

    onClickBack: function() {
        this.setState({ item: this.state.item - 1 });
        console.log(this.state.item);
    },

    onClickForward: function() {
        this.setState({ item: this.state.item + 1 });
        console.log(this.state.item);
    },

    render: function() {

        return (
                <div>

                <p>The current item to display is # {this.state.item}</p>

                <p>If this was real, then we would display image {LUT[this.state.item]}</p>

                <Button onClick={this.onClickBack}>Back</Button>
                &nbsp;
                <Button onClick={this.onClickForward}>Forward</Button>


                </div>
                );

    }

});
