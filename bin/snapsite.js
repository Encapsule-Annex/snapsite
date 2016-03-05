#!/usr/bin/env node

// snapsite.js

var package = require('../package.json');

// ARCtools is ARCcore + some shared CLI tool package dependencies.
const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;

const PATH = require('path');
const PROCESS = require('process');
const MKDIRP = require('mkdirp');
const React = require('react');

var filters = {
    load: {
        projectConfig: require('./filters/filter-load-project-config'),
        routeConfig: require('./filters/filter-load-route-config'),
        routeProviders: require('./filters/filter-load-route-providers'),
    },
    build: {
        routeProviders: require('./filters/filter-build-route-providers')
    },
    providers: {
        ReactJS: require('./filters/provider-reactjs'),
        StaticFiles: require('./filters/provider-staticfiles')
    }
};

var clistyle = ARCTOOLS.clistyles;

console.log(clistyle.bannerAuthor("Encapsule") + "/" + clistyle.bannerPackage(package.name) +
            " v" + clistyle.bannerVersion(package.version) + "\n" +
            "> " + clistyle.bannerAuthor("Facebook") + "/" + clistyle.bannerPackage("react") +
            " v" + clistyle.bannerVersion(React.version) + "\n" +
            "> " + clistyle.bannerAuthor("Encapsule") + "/" + clistyle.bannerPackage(ARCCORE.__meta.name) +
            " v" + clistyle.bannerVersion(ARCCORE.__meta.version) + " (" + ARCCORE.__meta.codename + ")");



// ==========================================================================
// LOAD PROJECT CONFIGURATION
console.log(clistyle.processStepHeader("> Loading configuration..."));
var loaderResponse = filters.load.projectConfig.request();
if (loaderResponse.error) {
    throw new Error(loaderResponse.error);
}
var projectConfig = loaderResponse.result;
console.log("... project root: " + clistyle.dirInput(projectConfig.dirs.package));
console.log("... project config: " + clistyle.fileInput(projectConfig.paths.config));
var projectConfigPath = PATH.join(projectConfig.dirs.output.cache, "project-config.json");
MKDIRP.sync(projectConfig.dirs.output.cache);

var writerResponse = ARCTOOLS.stringToFileSync.request({
    resource: JSON.stringify(projectConfig, undefined, 4),
    path: projectConfigPath
});
if (writerResponse.error) {
    throw new Error(writerResponse.error);
}
console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(projectConfigPath));
var projectRootDirectory = projectConfig.dirs.package;


// ==========================================================================
// LOAD THE ROUTE CONFIG
console.log(clistyle.processStepHeader("> Loading routes.."));
var routesBuilderResponse = filters.load.routeConfig.request({
    projectConfig: projectConfig
});
if (routesBuilderResponse.error) {
    throw new Error(routesBuilderResponse.error);
}
var routeConfig = routesBuilderResponse.result;
var routeConfigPath = PATH.join(projectConfig.dirs.output.cache, 'route-config.json');
MKDIRP(projectConfig.dirs.output.cache);
var writerResponse = ARCTOOLS.stringToFileSync.request({
    resource: JSON.stringify(routeConfig, undefined, 4),
    path: routeConfigPath
});
if (writerResponse.error) {
    throw new Error(writerResponse.error);
}
console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(routeConfigPath));

// ==========================================================================
// CREATE THE PROJECT MANIFEST FROM THE NORMALIZED CONFIG AND ROUTE DESCRIPTORS
var projectManifest = {
    projectConfig: projectConfig,
    routeConfig: routeConfig
};

// ==========================================================================
// LOAD THE ROUTE RESOURCE PROVIDERS (routines that abstract access to resources)
console.log(clistyle.processStepHeader("> Loading providers..."));

var providerLoaderResponse = filters.load.routeProviders.request({
    projectManifest: projectManifest,
    providers: filters.providers
});
if (providerLoaderResponse.error) {
    throw new Error(providerLoaderResponse.error);
}
var providersConfigMap = providerLoaderResponse.result;

var providersConfigPath = PATH.join(projectConfig.dirs.output.cache, 'providers-config.json');
var writerResponse = ARCTOOLS.stringToFileSync.request({
    resource: JSON.stringify(providersConfigMap, undefined, 4),
    path: providersConfigPath
});
if (writerResponse.error) {
    throw new Error(writerResponse.error);
}
console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(providersConfigPath));


// ==========================================================================
// BUILD THE ROUTE RESOURCES (via each route's registered provider(s))

console.log(clistyle.processStepHeader("> Building routes..."));

var invokedFromWorkingDirectory = PROCESS.cwd();
try {
    console.log("======================================================================");
    console.log("Debug:");
    console.log("snapsite working directory '" + PROCESS.cwd() + "'");
    console.log("snapsite bin directory '" + __dirname + "'");
    PROCESS.chdir(__dirname);
    console.log("... changed this process' working directory to '" + __dirname + "'");
} catch (error_) {
    throw new Error(error_.toString());
}

var providerBuilderResponse = filters.build.routeProviders.request({
    projectManifest: projectManifest,
    providers: filters.providers,
    providersConfigMap: providersConfigMap,
    callback: function(err, stats) {

        if (err) {
            console.log(clistyle.errorReportHeader("Builder operation failed with error!"));
            console.log(clistyle.errorReportErrors(err));
            process.exit(1);
        } else {

            var generatedPages = stats;
            var generatedPagesPath = PATH.join(projectConfig.dirs.output.cache, 'provider-build.json');
            var writerResponse = ARCTOOLS.stringToFileSync.request({
                resource: JSON.stringify(generatedPages, undefined, 4),
                path: generatedPagesPath
            });
            if (writerResponse.error) {
                throw new Error(writerResponse.error);
            }
            console.log(clistyle.infoBody("... wrote ") + clistyle.fileOutput(generatedPagesPath));

            console.log(clistyle.compilerSummaryHeader("Builder operation completed without error."));
            process.exit(0);
        }
    }

});
if (providerBuilderResponse.error) {
    throw new Error(providerBuilderResponse.error);
}













