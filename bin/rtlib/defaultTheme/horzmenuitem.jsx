// horzmenuitem.jsx

const React = require('react');

// snapsite page context via this.props
// + this.props.targetRouteHash
// + this.props.selectedRouteHash
// if selected route is the target route -> children unselected
// if selected route is neither the target nor descendent -> same as above
// if selected route is a descendent and it's a child -> children with select
// if selected route is a descendent but not a child -> children with active

module.exports = React.createClass({
    className: "HorizontalMenuItem",
    getInitialState: function() {
        return ({
            mouseMode: 'out' // 'over' or 'clicked' are legal values
        });
    },
    onMouseEnter: function() {
        if (this.state.mouseMode === 'clicked') {
            console.log("ignoring mouse enter because we're clicked");
            return;
        }
        console.log("setting mouse over state");
        this.setState({ mouseMode: 'over' });
    },
    onMouseLeave: function() {
        console.log("setting mouse out state");
        this.setState({ mouseMode: 'out' });
    },
    onClick: function() {
        console.log("setting mouse clicked state");
        this.setState({ mouseMode: 'clicked' });
    },
    render: function() {


        var content = [];

        var keyIndex = 0;
        var makeKey = function() { return ("HorizontalMenuItem"+keyIndex++) };

        if (this.props.lookup === undefined) {
            return(<div>HorizontalMenuItem missing snapsite lookup tables.</div>);
        }

        var targetRouteProps = this.props.pagesGraph.getVertexProperty(this.props.targetRouteHash);
        if (targetRouteProps === undefined) {
            return(<div>HorizontalMenuItem invalid target route '{this.props.targetRouteHash}' has no addressable page defined.</div>);
        }

        var selectedRouteProps = this.props.pagesGraph.getVertexProperty(this.props.selectedRouteHash);
        if (selectedRouteProps === undefined) {
            return (<div>HorizontalMenuItem invalid selected route '{this.props.selectedRouteHash}' has no addressable page defined.</div>);
        }

        var tsiTarget = targetRouteProps.ts.i;
        var tsoTarget = targetRouteProps.ts.o;
        var tsdTarget = targetRouteProps.ts.d;
        var tswTarget = targetRouteProps.ts.w;
        var tsiSelected = selectedRouteProps.ts.i;

        var mode;
        if ((tsiSelected < tsiTarget) || (tsoTarget < tsiSelected)) {
            mode = 'inactive';
        } else {
            if (tsiSelected === tsiTarget) {
                mode = 'selected';
            } else {
                mode = 'active';
            }
        }

        var baseStyles = {
            margin: '0px',
            padding: '0.2em',
            boxShadow: '1px 1px 1px 1px #999'
        };

        const outOpacity = '0.8';

        var modeStyles = {
            inactive: {
                out: {
                    opacity: outOpacity,
                    border: '1px solid #CCC',
                    cornerShape: 'round 1em'
                },
                over: {
                    border: '1px solid #CCC'
                },
                clicked: {
                    border: '1px solid #CCC',
                    backgroundColor: '#FF0'
                }
            },
            selected: {
                out: {
                    border: '1px solid #CCC',
                    backgroundColor: "#FF0",
                    opacity: outOpacity,
                    boxShadow: '1px 1px 1px 1px #999 inset'
                },
                over: {
                    border: '1px solid #CCC',
                    backgroundColor: '#FC0',
                    boxShadow: '1px 1px 1px 1px #999 inset'
                },
                clicked: {
                    border: '1px solid #CCC',
                    boxShadow: '1px 1px 1px 1px #999 inset'
                }
            },
            active: {
                out: {
                    border: '1px solid #DDD',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    opacity: outOpacity,
                    boxShadow: '1px 1px 1px 1px #777 inset'
                },
                over: {
                    border: '1px solid #DDD',
                    boxShadow: '1px 1px 1px 1px #777 inset'
                },
                clicked: {
                    border: '1px solid #DDD',
                    backgroundColor: '#FF0',
                    boxShadow: '1px 1px 1px 1px #777 inset'
                }
            }
        };

        var mouseMode = this.state.mouseMode;

        for (var name in modeStyles[mode][mouseMode]) {
            baseStyles[name] = modeStyles[mode][mouseMode][name];
        }

        var targetUrl = './' + targetRouteProps.primaryRouteHash + '.html';

        return (<span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}><a href={targetUrl} title={this.props.page.tooltip} style={baseStyles}>{tsiTarget}.{tsdTarget}.{tsoTarget}.{tswTarget} <strong>{targetRouteProps.title}</strong></a></span>);
    }
});


