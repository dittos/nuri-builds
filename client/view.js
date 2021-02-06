"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
var ReactDOM = __importStar(require("react-dom"));
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
        var elements = __spreadArrays(this.ancestorStates, [state]).map(function (it) { return components_1.createRouteElement(it.handler.component, {
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