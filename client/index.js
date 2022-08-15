"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.render = void 0;
var bootstrap_1 = require("../bootstrap");
var controller_1 = require("./controller");
var view_1 = require("./view");
var history_1 = require("./history");
var preload_1 = require("./preload");
function render(app, container, loader, errorHandler, preloadData) {
    var history = history_1.createHistory();
    var controller = new controller_1.AppController(app, history, loader);
    var view = new view_1.AppView(controller, container, errorHandler);
    controller.subscribe({
        willLoad: function () { },
        didLoad: function () { },
        didAbortLoad: function () { },
        didCommitState: function (state, ancestorStates) {
            view.setState(state, ancestorStates);
        }
    });
    controller.start(preloadData);
    return controller;
}
exports.render = render;
function bootstrap(app, loader, errorHandler, callback) {
    preload_1.onPreloadDataReady(function (preloadData) {
        var controller = render(app, document.getElementById(bootstrap_1.containerElementId), loader, errorHandler, preloadData);
        callback(controller);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map