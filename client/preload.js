"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPreloadDataReady = void 0;
var bootstrap_1 = require("../bootstrap");
function onPreloadDataReady(callback, globalScope) {
    if (globalScope === void 0) { globalScope = window; }
    var globalVariable = globalScope[bootstrap_1.globalVariableName];
    if (!globalVariable.preloadData) {
        // HTML is not rendered yet
        globalScope[bootstrap_1.globalVariableName] = function (preloadData) {
            globalScope[bootstrap_1.globalVariableName].preloadData = preloadData;
            callback(preloadData);
        };
        return;
    }
    callback(globalVariable.preloadData);
}
exports.onPreloadDataReady = onPreloadDataReady;
//# sourceMappingURL=preload.js.map