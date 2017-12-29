"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var app_1 = require("../app");
var components_1 = require("../components");
var AppView = /** @class */ (function () {
    function AppView(controller, container) {
        var _this = this;
        this.controller = controller;
        this.container = container;
        this.state = null;
        window.addEventListener('scroll', function () {
            var docEl = document.documentElement;
            if (docEl) {
                _this._onScrollChange(window.pageXOffset || docEl.scrollLeft, window.pageYOffset || docEl.scrollTop);
            }
        }, false);
    }
    AppView.prototype.setState = function (state) {
        this.state = state;
        this._render();
    };
    AppView.prototype._render = function () {
        var state = this.state;
        if (!state) {
            return;
        }
        var handler = state.handler, data = state.data, _a = state.scrollX, scrollX = _a === void 0 ? 0 : _a, _b = state.scrollY, scrollY = _b === void 0 ? 0 : _b;
        document.title = app_1.renderTitle(this.controller.app, handler, data);
        var element = components_1.createRouteElement(handler.component, {
            controller: this.controller,
            data: data,
            writeData: this.writeData.bind(this, state),
            loader: this.controller.getLoader(),
        });
        ReactDOM.render(element, this.container);
        window.scrollTo(scrollX, scrollY);
    };
    AppView.prototype.writeData = function (state, updater) {
        if (!this.state || this.state !== state)
            return;
        // TODO: batch updates
        updater(this.state.data);
        this._render();
    };
    AppView.prototype._onScrollChange = function (x, y) {
        if (this.state) {
            this.state.scrollX = x;
            this.state.scrollY = y;
        }
    };
    return AppView;
}());
exports.AppView = AppView;
//# sourceMappingURL=view.js.map