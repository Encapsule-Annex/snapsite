# snapsite (prototype)

`Encapsule/snapsite` is an experimental command line tool for compiling React JS websites from configuration files that I have been developing in hopes of dramatically reducing the effort required author and publish non-trivial technical documentation for this and many other projects.

## Design Goals

- Leverage Facebook's React JS framework for rendering HTML, managing re-usable rendering components.
- Leverage webpack, babel, etc. to provide automated compilation of required server and client-side render functions.
- Synthesize all boilerplate client and server side glue logic required to integrate routing and site navigation at build-time.
- Pre-calculate static per-route "views" over site meta-data constructed during the site build and compilation process and get this context delivered to all the right places without the developer having to comprehend the routing model (not at all trivial in the general case). 
- Provide a well-reasoned separation of concerns and extensible interface for theming snapsite-generated websites.
- Provide a well-reasoned and extensible model for building up re-usable libraries of React JS components, and **data models** that can be used pervasively throughout your application to automate error-prone and costly operations (e.g. resource location, state management, validation, normalization, observation...).
- Design for full-blown custom Node.js server deployment w/graceful path for exporting static builds to GitHub pages, CDN...



