
const package = require('../../package.json');

const ARCTOOLS = require('arctools');
const ARCCORE = ARCTOOLS.arccore;

const locatePackageManifestFilter = require('./filter-locate-package-manifest');
const extractProjectConfigPath = require('./filter-parse-package-manifest');
const normalizeProjectConfig = require('./filter-normalize-project-config');

const specNormalizedProjectConfig = require('./spec-norm-project-config');

const PATH = require('path');
const FS = require('fs');

var date = new Date();
var buildTimeDefault = date.getTime();
var buildDateDefault = date.toString();

var factoryResponse = ARCCORE.filter.create({

    operationID: "tiLl455kTaSH6jh9b8Aipg",
    operationName: "Project Config Loader",
    operationDescription: "Loads Encapsule project configuration from file path indicated in your project's package.json.",

    inputFilterSpec: {
        ____label: "Search Directory",
        ____description: "Optional path to the search start directory (default: cwd).",
        ____types: [ "jsUndefined", "jsString" ]
    },

    outputFilterSpec: specNormalizedProjectConfig,

    bodyFunction: function(request_) {
        var response = { error: null, result: null };
        var errors = [];
        var inBreakScope = false;
        while (!inBreakScope) {
            inBreakScope = true;

            // Find package.json relative to the current working directory.
            // Checks current working directory, then parent, granparent...
            var locatorResponse = locatePackageManifestFilter.request();
            if (locatorResponse.error) {
                errors.unshift(locatorResponse.error);
                break;
            }
            var runtimeDirs = locatorResponse.result; // { packageManifestPath: string, projectRootDirectory: string }

            // Load and deserialize package.json from the identified location.
            var loaderResponse = ARCTOOLS.jsrcFileLoaderSync.request(runtimeDirs.packageManifestPath);
            if (loaderResponse.error) {
                errors.unshift(loaderResponse.error);
                errors.unshift("Unable to load package manifest (packge.json).");
                break;
            }
            var packageManifestDescriptor = loaderResponse.result.resource; // package.json object

            // Extract Encapsule project config module path from package manifest.
            var filterResponse = extractProjectConfigPath.request(packageManifestDescriptor);
            if (filterResponse.error) {
                errors.unshift(filterResponse.error);
                errors.unshift("Package manifest '" + runtimeDirs.packageManifestPath + "' does not declare Encapsule project configuration path.");
                break;
            }
            var projectConfigPath = PATH.join(runtimeDirs.projectRootDirectory, filterResponse.result.configFile); // config relative to project root

            // Load the specified configuration module.
            loaderResponse = ARCTOOLS.jsrcFileLoaderSync.request(projectConfigPath);
            if (loaderResponse.error) {
                errors.unshift(loaderResponse.error);
                errors.unshift("Could not load the specified project config file '" + projectConfigPath + "'.");
                break;
            }

            // The config is what the developer specifies.
            // The manifest is what we deduce from the config.
            // Both contain several directory specifications.
            // These paths are relative to the project's root directory.

            var developerConfig = loaderResponse.result.resource;

            var normalizerResponse = normalizeProjectConfig.request(developerConfig);
            if (normalizerResponse.error) {
                errors.unshift(normalizerResponse.error);
                errors.unshift("Failed to parse project config '" + loaderResponse.result.origin + "'.");
                break;
            }

            var normalizedConfig = normalizerResponse.result;

            // ALL PERSISTED PATHS ARE RELATIVE PATHS.
            // CONVERT TO ABSOLUTE PATHS WHEN DESERIALIZING.

            normalizedConfig.paths = { config: loaderResponse.result.origin };
            normalizedConfig.dirs.package = runtimeDirs.projectRootDirectory;
            normalizedConfig.dirs.input.routes = PATH.join(runtimeDirs.projectRootDirectory, normalizedConfig.dirs.input.routes);
            for (var property in normalizedConfig.dirs.output) {
                var relativePath = normalizedConfig.dirs.output[property];
                normalizedConfig.dirs.output[property] = PATH.join(runtimeDirs.projectRootDirectory, relativePath);
            }

            normalizedConfig.generator = {
                build: {
                    time: buildTimeDefault,
                    date: buildDateDefault,
                    hash: ARCCORE.identifier.irut.fromEther()
                }
            };

            normalizedConfig.site.copyright = "Copyright (C) " + date.getFullYear() + " " + normalizedConfig.org.name;

            // Return the configuration module.
            response.result = normalizedConfig;
            break;
        }
        if (errors.length) {
            response.error = errors.join(" ");
        }
        return response;
    }
});

if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}

module.exports = factoryResponse.result;
