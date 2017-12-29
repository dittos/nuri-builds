"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/defer");
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var app_1 = require("../app");
var navigation_1 = require("./navigation");
var _loader;
function injectLoader(loader) {
    _loader = loader;
}
exports.injectLoader = injectLoader;
var AppController = /** @class */ (function () {
    function AppController(app, history) {
        this.app = app;
        this._priv = new AppControllerPrivate(app, history);
    }
    AppController.prototype.start = function (preloadData) {
        this._priv.start(preloadData);
    };
    AppController.prototype.load = function (uri) {
        this._priv.load(uri);
    };
    AppController.prototype.subscribe = function (delegate) {
        this._priv.subscribe(delegate);
    };
    AppController.prototype.getLoader = function () {
        return _loader;
    };
    return AppController;
}());
exports.AppController = AppController;
var AppControllerPrivate = /** @class */ (function () {
    function AppControllerPrivate(app, history) {
        this.app = app;
        this._history = history;
        this._navigationController = new navigation_1.NavigationController(this);
        this._delegates = [];
    }
    AppControllerPrivate.prototype.start = function (preloadData) {
        var _this = this;
        this._history.locationChanges().subscribe(function (loc) {
            _this._navigationController.pop(loc);
        });
        var location = this._history.getLocation();
        var preloadState;
        if (preloadData) {
            var matchedRequest = this._matchRoute(location.uri);
            preloadState = {
                handler: matchedRequest.handler,
                data: preloadData,
            };
        }
        this._navigationController.start(location, preloadState);
    };
    AppControllerPrivate.prototype.subscribe = function (delegate) {
        this._delegates.push(delegate);
    };
    AppControllerPrivate.prototype.willLoad = function () {
        this._delegates.forEach(function (delegate) { return delegate.willLoad(); });
    };
    AppControllerPrivate.prototype.didLoad = function () {
        this._delegates.forEach(function (delegate) { return delegate.didLoad(); });
    };
    AppControllerPrivate.prototype.didAbortLoad = function () {
        this._delegates.forEach(function (delegate) { return delegate.didAbortLoad(); });
    };
    AppControllerPrivate.prototype.didCommitLoad = function (type, _a) {
        var uri = _a.uri, token = _a.token, state = _a.state;
        switch (type) {
            case 'replace':
                this._history.setHistoryToken(token);
                break;
            case 'push':
                this._history.pushLocation({ uri: uri, token: token });
                break;
            case 'pop':
                // Keep history untouched as the event originates from history
                break;
        }
        this._delegates.forEach(function (delegate) { return delegate.didCommitState(state); });
    };
    AppControllerPrivate.prototype.load = function (uri) {
        if (this._history.doesPushLocationRefreshPage()) {
            this._history.pushLocation({ uri: uri, token: null });
        }
        else {
            this._navigationController.push(uri);
        }
    };
    AppControllerPrivate.prototype.loadState = function (uri) {
        var _a = this._matchRoute(uri), handler = _a.handler, params = _a.params;
        var load = handler.load;
        if (!load) {
            return Observable_1.Observable.of({
                handler: handler,
                data: {},
            });
        }
        var request = app_1.createRequest({
            app: this.app,
            loader: _loader,
            path: uri.path,
            query: uri.query,
            params: params,
        });
        return Observable_1.Observable.defer(function () { return load(request); })
            .map(function (response) {
            if (app_1.isRedirect(response)) {
                return response;
            }
            else {
                var data = response;
                return {
                    handler: handler,
                    data: data,
                };
            }
        });
    };
    AppControllerPrivate.prototype._matchRoute = function (uri) {
        return app_1.matchRoute(this.app, uri);
    };
    return AppControllerPrivate;
}());
//# sourceMappingURL=controller.js.map