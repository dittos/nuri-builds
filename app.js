"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyAppTitle = exports.renderTitle = exports.matchRoute = exports.createApp = exports.App = exports.createRequest = exports.isRedirect = exports.Redirect = void 0;
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var isFunction = require("lodash/isFunction");
var util_1 = require("./util");
var Redirect = /** @class */ (function () {
    function Redirect(uri, options) {
        if (options === void 0) { options = { stacked: false }; }
        this.uri = util_1.uriToString(uri);
        this.options = options;
    }
    return Redirect;
}());
exports.Redirect = Redirect;
function redirect(uri, options) {
    return Promise.resolve(new Redirect(uri, options));
}
function isRedirect(obj) {
    return obj instanceof Redirect;
}
exports.isRedirect = isRedirect;
function createRequest(base) {
    return __assign(__assign({}, base), { redirect: redirect });
}
exports.createRequest = createRequest;
var defaultHandler = {
    load: function () {
        return Promise.reject({ status: 404 });
    },
    component: function () { return null; },
};
var App = /** @class */ (function () {
    function App() {
        this.routes = [];
        this.defaultHandler = defaultHandler;
        this.title = '';
    }
    App.prototype.route = function (path, handler) {
        if (path === '*') {
            this.defaultHandler = handler;
            return;
        }
        var keys = [];
        var regexp = path_to_regexp_1.default(path, keys);
        this.routes.push({
            regexp: regexp,
            keys: keys,
            handler: handler,
        });
    };
    return App;
}());
exports.App = App;
function createApp() {
    return new App();
}
exports.createApp = createApp;
function matchRoute(app, uri) {
    var routes = app.routes;
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var matches = route.regexp.exec(uri.path);
        if (matches) {
            var params = {};
            for (var j = 0; j < matches.length - 1; j++) {
                params[route.keys[j].name] = decodeURIComponent(matches[j + 1]);
            }
            return {
                handler: route.handler,
                params: params,
            };
        }
    }
    return {
        handler: app.defaultHandler,
        params: {},
    };
}
exports.matchRoute = matchRoute;
function renderTitle(app, handler, data) {
    var routeTitle = handler.renderTitle ? handler.renderTitle(data) : '';
    return applyAppTitle(app, routeTitle);
}
exports.renderTitle = renderTitle;
function applyAppTitle(app, routeTitle) {
    var titleFn = app.title;
    if (isFunction(titleFn)) {
        return titleFn(routeTitle);
    }
    var defaultTitle = titleFn;
    return routeTitle || defaultTitle;
}
exports.applyAppTitle = applyAppTitle;
//# sourceMappingURL=app.js.map