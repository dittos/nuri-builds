"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_1 = require("../app");
var navigation_1 = require("./navigation");
var util_1 = require("../util");
var AppController = /** @class */ (function () {
    function AppController(app, history, loader) {
        var _this = this;
        this.app = app;
        this.history = history;
        this.loader = loader;
        this.loadState = function (_a) {
            var uri = _a.uri, stacked = _a.stacked;
            var parsedURI = util_1.parseURI(uri);
            var match = _this.matchRoute(parsedURI);
            if (!match) {
                var lazyMatch_1 = app_1.matchLazyRoute(_this.app, parsedURI);
                if (lazyMatch_1) {
                    return rxjs_1.defer(function () { return lazyMatch_1.handler(); })
                        .pipe(operators_1.switchMap(function (handler) {
                        return _this.loadStateFromMatch({
                            handler: handler,
                            params: lazyMatch_1.params,
                            routeId: undefined,
                        }, uri, parsedURI, stacked);
                    }));
                }
                return rxjs_1.of({
                    state: {
                        status: 'error',
                        error: 'Not Found',
                    },
                    escapeStack: true,
                });
            }
            return _this.loadStateFromMatch(match, uri, parsedURI, stacked);
        };
        var delegates = [];
        this.delegates = delegates;
        this.navigationController = new navigation_1.NavigationController({
            willLoad: function () {
                delegates.forEach(function (delegate) { return delegate.willLoad(); });
            },
            didLoad: function () {
                delegates.forEach(function (delegate) { return delegate.didLoad(); });
            },
            didAbortLoad: function () {
                delegates.forEach(function (delegate) { return delegate.didAbortLoad(); });
            },
            didCommitLoad: function (state, ancestorStates) {
                delegates.forEach(function (delegate) { return delegate.didCommitState(state, ancestorStates); });
            },
        }, this.loadState, history);
    }
    AppController.prototype.start = function (preloadData) {
        var preloadState;
        if (preloadData) {
            var location_1 = this.history.getLocation();
            var matchedRequest = this.matchRoute(util_1.parseURI(location_1.uri));
            preloadState = matchedRequest ? {
                status: 'ok',
                handler: matchedRequest.handler,
                data: preloadData,
            } : {
                status: 'error',
                error: 'Not Found',
            };
        }
        this.navigationController.start(preloadState);
    };
    AppController.prototype.load = function (uri, options) {
        if (options === void 0) { options = { stacked: false, returnToParent: false }; }
        if (options.returnToParent && this.navigationController.hasParent()) {
            this.navigationController.returnToParent();
        }
        else {
            this.navigationController.push(util_1.uriToString(uri), options);
        }
    };
    AppController.prototype.subscribe = function (delegate) {
        this.delegates.push(delegate);
    };
    AppController.prototype.getLoader = function () {
        return this.loader;
    };
    AppController.prototype.loadStateFromMatch = function (match, uri, parsedURI, stacked) {
        var handler = match.handler, params = match.params;
        var load = handler.load;
        if (!load) {
            return rxjs_1.of({
                state: {
                    status: 'ok',
                    handler: handler,
                    data: {},
                }
            });
        }
        var request = app_1.createRequest({
            loader: this.loader,
            uri: uri,
            path: parsedURI.path,
            query: parsedURI.query,
            params: params,
            stacked: stacked,
        });
        return rxjs_1.defer(function () { return load(request); })
            .pipe(operators_1.map(function (response) {
            if (app_1.isRedirect(response)) {
                return response;
            }
            else {
                var data = response;
                return {
                    state: {
                        status: 'ok',
                        handler: handler,
                        data: data,
                    }
                };
            }
        }), operators_1.catchError(function (error) {
            return rxjs_1.of({
                state: {
                    status: 'error',
                    error: error,
                },
                escapeStack: true,
            });
        }));
    };
    AppController.prototype.matchRoute = function (uri) {
        return app_1.matchRoute(this.app, uri);
    };
    return AppController;
}());
exports.AppController = AppController;
//# sourceMappingURL=controller.js.map