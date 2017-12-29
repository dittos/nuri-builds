"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/switchMap");
var Subscription_1 = require("rxjs/Subscription");
var app_1 = require("../app");
var util_1 = require("../util");
var NavigationController = /** @class */ (function () {
    function NavigationController(delegate) {
        this.delegate = delegate;
        this.entries = {};
        this.currentEntry = null;
        this.started = false;
        this.loadSubscription = Subscription_1.Subscription.EMPTY;
    }
    NavigationController.prototype.start = function (_a, preloadState) {
        var uri = _a.uri, token = _a.token;
        if (this.started)
            return;
        this.started = true;
        var shouldUsePreloadData = !token;
        if (shouldUsePreloadData && preloadState) {
            this._commit('replace', {
                uri: uri,
                token: uuid_1.v4(),
                state: preloadState,
                isRedirect: false,
            });
        }
        else {
            this._navigate('replace', uri, uuid_1.v4());
        }
    };
    NavigationController.prototype.push = function (uri) {
        this._abortLoad();
        this._navigate('push', uri, uuid_1.v4());
    };
    NavigationController.prototype.pop = function (location) {
        this._abortLoad();
        var token = location.token;
        var loadedEntry = token && this.entries[token];
        if (loadedEntry) {
            this._commit('pop', loadedEntry);
        }
        else {
            this._navigate('pop', location.uri, token || uuid_1.v4());
        }
    };
    NavigationController.prototype._abortLoad = function () {
        if (!this.loadSubscription.closed) {
            this.loadSubscription.unsubscribe();
            this.delegate.didAbortLoad();
        }
    };
    NavigationController.prototype._navigate = function (type, uri, token) {
        var _this = this;
        this.delegate.willLoad();
        this.loadSubscription = this._load(uri, token).subscribe(function (entry) {
            _this.delegate.didLoad();
            if (entry.isRedirect && type === 'pop') {
                // 'pop' does not apply changed uri to address bar
                // TODO: test this behavior
                type = 'push';
            }
            _this._commit(type, entry);
        }); // TODO: handle onError
    };
    NavigationController.prototype._load = function (uri, token, isRedirect) {
        var _this = this;
        if (isRedirect === void 0) { isRedirect = false; }
        return this.delegate.loadState(uri)
            .switchMap(function (result) {
            if (result instanceof app_1.Redirect) {
                return _this._load(util_1.parseURI(result.uri), uuid_1.v4(), true);
            }
            else {
                return Observable_1.Observable.of({
                    uri: uri,
                    token: token,
                    state: result,
                    isRedirect: isRedirect,
                });
            }
        });
    };
    NavigationController.prototype._commit = function (type, entry) {
        this.currentEntry = entry;
        this.entries[entry.token] = entry;
        this.delegate.didCommitLoad(type, entry);
    };
    return NavigationController;
}());
exports.NavigationController = NavigationController;
//# sourceMappingURL=navigation.js.map