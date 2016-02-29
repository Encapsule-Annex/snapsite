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
            marginRight: '0.5em',
            padding: '0.2em',
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
            boxShadow: '1px 1px 10px 0px #CCC',
            fontFamily: 'Courier',
            fontSize: '10pt',
            textAlign: 'center',
            borderRadius: '0.5em',
            opacity: '1.0'
        };

        const outOpacity = '0.7';

        const modeStyles = {
            inactive: {
                out: {
                    opacity: outOpacity,
                    border: '1px solid #CCC'
                },
                over: {
                    border: '1px solid #CCC',
                    boxShadow: '1px 1px 8px 0px #CCC inset',
                    fontWeight: 'bold'
                },
                clicked: {
                    border: '1px solid #CCC',
                    boxShadow: '1px 1px 8px 0px #999 inset',
                    backgroundColor: '#CDE',
                    fontWeight: 'bold'
                }
            },
            selected: {
                out: {
                    border: '1px solid #CCC',
                    backgroundColor: "#DEF",
                    boxShadow: '1px 1px 8px 0px #CCC inset',
                    fontWeight: 'bold'
                },
                over: {
                    border: '1px solid #CCC',
                    backgroundColor: "#DEF",
                    fontWeight: 'normal'
                },
                clicked: {
                    border: '1px solid #EEE',
                    fontWeight: 'normal'
                }
            },
            active: {
                out: {
                    border: '1px solid #DDD',
                    backgroundColor: '#CDE',
                    boxShadow: '1px 1px 8px 0px #CCC inset',
                    fontWeight: 'bold'
                },
                over: {
                    border: '1px solid #DDD',
                    backgroundColor: "#DEF",
                    boxShadow: '1px 1px 8px 0px #CCC inset',
                    fontWeight: 'bold'
                },
                clicked: {
                    border: '1px solid #EEE',
                    boxShadow: '1px 1px 8px 0px #999 inset',
                    backgroundColor: '#DEF',
                    fontWeight: 'bold'
                }
            }
        };

        const modeLinkTextPrefix = {
            inactive: {
                out: '+',
                over: '+',
                clicked: '-'
            },
            selected: {
                out: '-',
                over: '-',
                clicked: '+'
            },
            active: {
                out: '-',
                over: '-',
                clicked: '-'
            }
        };

        var mouseMode = this.state.mouseMode;

        for (var name in modeStyles[mode][mouseMode]) {
            baseStyles[name] = modeStyles[mode][mouseMode][name];
        }

        var targetUrl;
        var targetTooltip;
        var linkText;
        var targetUrlStrategy = 'target';

        if (mode === 'selected') {
            if (this.props.pagesGraph.inDegree(targetRouteProps.primaryRouteHash)) {
                targetUrlStrategy = 'parent';
            }
        }

        if (targetUrlStrategy === 'target') {
            targetUrl = './' + targetRouteProps.primaryRouteHash + '.html';
            targetTooltip = "[snapmenu:" + ([tsiTarget, tsdTarget, tsoTarget, tswTarget]).join('.') + "]>> " + targetRouteProps.tooltip;
        } else {
            var parentRouteProps = this.props.pagesGraph.getVertexProperty(this.props.pagesGraph.inEdges(targetRouteProps.primaryRouteHash)[0].u);
            targetUrl = './' + parentRouteProps.primaryRouteHash + '.html';
            targetTooltip = "[snapmenu:" + ([tsiTarget, tsdTarget, tsoTarget, tswTarget]).join('.') + "]>> Close " + targetRouteProps.title + " and return to " + parentRouteProps.title + "...";
        }

        linkText = targetRouteProps.title;
        if (tswTarget) {
            linkText = modeLinkTextPrefix[mode][mouseMode] + " " + linkText + " (" + (tswTarget) + ")";
        }

        return (<span style={baseStyles}><a href={targetUrl} title={targetTooltip} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>{linkText}</a></span>);
    }
});


