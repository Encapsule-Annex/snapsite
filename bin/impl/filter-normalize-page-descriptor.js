// filter-construct-page-descriptor.js

var ARCCORE = require('arccore');
var pageDescriptorInputSpec = require('./filter-normalize-page-descriptor-input');
var factoryResponse = ARCCORE.filter.create({
    operationID: "-7-VRhJeQWGA_yUX9nxYxg",
    operationName: "Page Descriptor Normalizer",
    operationDescription: "Normalizes a page descriptor object.",
    inputFilterSpec: pageDescriptorInputSpec
});
if (factoryResponse.error) {
    throw new Error(factoryResponse.error);
}
module.exports = factoryResponse.result;
