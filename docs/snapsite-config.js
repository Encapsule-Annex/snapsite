// snapsite-config.js

module.exports = {
    org: {
        name: "Encapsule.io",
        url: "https://encapsule.io",
        location: "Bellevue, WA USA",
        seed: "koJdft_STGCMJe6dZcq5kg"
    },
    site: {
        title: "snapsite",
        description: "Encapsule.io snapsite website generator project homepage.",
        seed: "4pJr9UX5Q9aIn2yudW138Q",
        url: "http://github.com/Encapsule/snapsite",
    },
    dirs: {
        input: {
            routes: 'docs/input'
        },
        output: {
            cache: 'docs/output/cache',
            client: '../snapsite.gh-pages',
            server: 'docs/output/server'
        }
    },
    providers: {
        ReactJS: {
            theme: {
                // Styles to apply to HTML BODY tag.
                body: {
                    margin: '0px',
                    padding: '0px',
                    margin: 'none'
                },
                // Default style for internal A tags
                link: {
                    fontDecoration: 'none',
                    color: '#06C'
                },
                // Default style for internal A:hover (simulated)
                linkHover: {
                    fontDecoration: 'underline',
                    color: '#090',
                },
                // Default style for internal A:active (simulated)
                linkLoading: {
                    fontDecoration: 'underline',
                    color: '#C00'
                },
                // Default style of external A tags
                xlink: {
                    fontDecoration: 'none',
                    color: '#090'
                },
                // Default style for external A:hover (simulated)
                xlinkHover: {
                    fontDecoration: 'underline',
                    color: '#06C'
                },
                // Default style for external A:active (simulated)
                xlinkLoading: {
                    fontDecoration: 'underline',
                    color: '#C00'
                },
                header1: {
                    fontSize: '22pt',
                    fontWeight: 'bold',
                    color: '#CCCCCC',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                header2: {
                    fontSize: '20pt',
                    fontWeight: 'bold',
                    color: '#BBBBBB',
                    borderBottom: '1px solid #EEEEEE',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                header3: {
                    fontSize: '18pt',
                    fontWeight: 'bold',
                    color: '#AAAAAA',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                header4: {
                    fontSize: '16pt',
                    fontWeight: 'bold',
                    color: '#999999',
                    borderBottom: '1px solid #EEEEEE',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                header5: {
                    fontSize: '14pt',
                    fontWeight: 'bold',
                    color: '#888888',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                header6: {
                    fontSize: '12pt',
                    fontWeight: 'bold',
                    color: '#777777',
                    borderBottom: '1px solid #EEEEEE',
                    marginTop: '0.5em',
                    marginBottom: '0.25em'
                },
                // Styles to apply to top-level page content DIV within BODY (all visible HTML)
                pageBlock: {
                    // margin: '1em'
                },
                // Styles to apply to breadcrumbs block
                breadcrumbsBlock: {
                    backgroundColor: '#EEE',
                    padding: '0.25em',
                    paddingLeft: '1em',
                    boxShadow: '0px 0px 4px 2px #CCC'
                },
                // Styles to apply to the title block
                titleBlock: {
                    margin: '1em',
                    borderBottom: '1px solid #EEEEEE'
                },
                // Styles to apply to the title text within the title block
                title: {
                    fontSize: '26pt',
                    fontWeight: 'bold',
                    color: '#999999'
                },
                // Styles to apply to the subtitle within the title block
                subtitle: {
                    fontSize: '14pt',
                    fontWeight: 'medium',
                    color: '#CCCCCC'
                },
                // Styles to apply to containing DIV around a page's specific content.
                contentBlock: {
                    margin: '1em'
                },
                // Styles to apply to DIV containing the copyright
                copyrightBlock: {
                    backgroundColor: '#EEE',
                    padding: '0.25em',
                    paddingRight: '1em',
                    boxShadow: '0px 1px 4px 0px #CCC inset',
                    textAlign: 'right'
                },
                snapBugBlock: {
                    fontFamily: 'Courier',
                    fontSize: '6pt',
                    color: '#ACB',
                    paddingBotton: '1em',
                    margin: '0px',
                    marginTop: '2em',
                    marginRight: '1em',
                    textAlign: 'right'
                },
                snapBugLink: {
                    textDecoration: 'none',
                    color: '#999'
                }
            }
        }
    }

};
