// client-runtime.js

module.exports = function(request_) {

    console.log("Route '" + request_.context.page.primaryRoute + "' + client extension entry...");

    console.log("... setting a timer to refresh page.");
    setInterval(request_.renderContent, 1000/24);

};
