"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        didCommitState: function (state) {
            view.setState(state);
        }
    });
    controller.start(preloadData);
    return controller;
}
exports.render = render;
//# sourceMappingURL=index.js.map