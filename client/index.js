"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bootstrap_1 = require("../bootstrap");
var controller_1 = require("./controller");
var view_1 = require("./view");
var history_1 = require("./history");
var controller_2 = require("./controller");
exports.injectLoader = controller_2.injectLoader;
function render(app, container, preloadData) {
    var history = history_1.createHistory();
    var controller = new controller_1.AppController(app, history);
    var view = new view_1.AppView(controller, container);
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
function bootstrap(app, callback) {
    var globalVariable = window[bootstrap_1.globalVariableName];
    if (!globalVariable) {
        // HTML is not rendered yet
        window[bootstrap_1.globalVariableName] = function (preloadData) {
            window[bootstrap_1.globalVariableName].preloadData = preloadData;
            bootstrap(app, callback);
        };
        return;
    }
    var controller = render(app, document.getElementById(bootstrap_1.containerElementId), globalVariable.preloadData);
    callback(controller);
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map