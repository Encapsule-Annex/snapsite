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
                // Styles to apply to top-level page content DIV within BODY (all visible HTML)
                pageBlock: {
                    // margin: '1em'
                },
                // Styles to apply to breadcrumbs block
                breadcrumbsBlock: {
                    backgroundColor: '#F0F0F0',
                    padding: '0.25em',
                    boxShadow: '0px 4px 8px 1px #DDDDDD'
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
                    backgroundColor: '#F0F0F0',
                    padding: '0.25em',
                    paddingRight: '1em',
                    boxShadow: '0px 4px 8px 1px #DDDDDD',
                    textAlign: 'right'
                }
            }
        }
    }

};
