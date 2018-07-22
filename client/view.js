"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var app_1 = require("../app");
var components_1 = require("../components");
var AppView = /** @class */ (function () {
    function AppView(controller, container) {
        var _this = this;
        this.ancestorStates = [];
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
    AppView.prototype.setState = function (state, ancestorStates) {
        this.state = state;
        this.ancestorStates = ancestorStates;
        this._render();
    };
    AppView.prototype._render = function () {
        var _this = this;
        var state = this.state;
        if (!state) {
            return;
        }
        var parent = this.ancestorStates.length > 0 ? this.ancestorStates[this.ancestorStates.length - 1] : null;
        var handler = state.handler, data = state.data, _a = state.scrollX, scrollX = _a === void 0 ? (parent && parent.scrollX) || 0 : _a, _b = state.scrollY, scrollY = _b === void 0 ? (parent && parent.scrollY) || 0 : _b;
        document.title = app_1.renderTitle(this.controller.app, handler, data);
        var elements = this.ancestorStates.concat([state]).map(function (it) { return components_1.createRouteElement(it.handler.component, {
            controller: _this.controller,
            data: it.data,
            writeData: _this.writeData.bind(_this, it),
            loader: _this.controller.getLoader(),
        }); });
        ReactDOM.render(elements, this.container);
        window.scrollTo(scrollX, scrollY);
    };
    AppView.prototype.writeData = function (state, updater) {
        // TODO: batch updates
        updater(state.data);
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