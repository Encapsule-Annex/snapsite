![Encapsule.io](https://encapsule.io/images/blue-burst-encapsule.io-logo-251x64.png "Encapsule.io")

# snapsite (prerelease)

## Summary

[Encapsule/snapsite](https://github.com/Encapsule/snapsite] is an experimental command line tool for compiling React JS websites from configuration files that's being developed to automate the task of documenting Encapsule libraries.

## Status

This project is under active development and is likely to change substantially before I make any effort to publicize its feature set and encourage others to try for themselves on their own projects. Please follow [@Encapsule.io](https://twitter.com/Encapsule) for update notifications.

## Test Output

It's still very crude (mostly disposable test pages linked into a simple site), but you can view a small static website (with client-side dynamism powered by React JS) that's been published to [this project's GitHub Project Page](http://encapsule.github.io/snapsite). To view the generated client source code (not yet optimized through webpack), view the gh-pages branch of the the [Encapsule/snapsite](https://github.com/Encapsule/snapsite) repository.

## Design Goals

- Leverage Facebook's React JS framework for rendering HTML, managing re-usable rendering components.
- Leverage webpack, babel, etc. to provide automated compilation of required server and client-side render functions.
- Synthesize all boilerplate client and server side glue logic required to integrate routing and site navigation at build-time.
- Pre-calculate static per-route "views" over site meta-data constructed during the site build and compilation process and get this context delivered to all the right places without the developer having to comprehend the routing model (not at all trivial in the general case).
- Provide a well-reasoned separation of concerns and extensible interface for theming snapsite-generated websites.
- Provide a well-reasoned and extensible model for building up re-usable libraries of React JS components, and **data models** that can be used pervasively throughout your application to automate error-prone and costly operations (e.g. resource location, state management, validation, normalization, observation...).
- Design for full-blown custom Node.js server deployment w/graceful path for exporting static builds to GitHub pages, CDN...
- Plug-in API for defining functional add-ons. (e.g. static blog similar to Jekyll but more powerful and extensible).



