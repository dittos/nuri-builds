"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateToken = require("nanoid/non-secure");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/switchMap");
var Subscription_1 = require("rxjs/Subscription");
var app_1 = require("../app");
var NavigationController = /** @class */ (function () {
    function NavigationController(delegate, stateLoader, history) {
        this.delegate = delegate;
        this.stateLoader = stateLoader;
        this.history = history;
        this.entries = {};
        this.entryTokens = [];
        this.currentEntry = null;
        this.started = false;
        this.loadSubscription = Subscription_1.Subscription.EMPTY;
    }
    NavigationController.prototype.start = function (preloadState) {
        var _this = this;
        if (this.started)
            return;
        this.started = true;
        this.history.locationChanges().subscribe(function (loc) {
            _this.pop(loc);
        });
        var location = this.history.getLocation();
        // If the controller is started with token, preload data could be stale,
        // so it is safe to ignore it.
        var shouldUsePreloadData = !location.token;
        if (shouldUsePreloadData && preloadState) {
            this.commit('replace', {
                uri: location.uri,
                token: generateToken(),
                state: preloadState,
                isRedirect: false,
                parentToken: null,
            });
        }
        else {
            this.navigate('replace', location.uri, generateToken());
        }
    };
    NavigationController.prototype.push = function (uri, options) {
        if (options === void 0) { options = { stacked: false }; }
        if (this.history.doesPushLocationRefreshPage()) {
            this.history.pushLocation({ uri: uri, token: null });
            return;
        }
        this.abortLoad();
        this.navigate('push', uri, generateToken(), options.stacked);
    };
    NavigationController.prototype.hasParent = function () {
        return this.currentEntry ? this.currentEntry.parentToken != null : false;
    };
    NavigationController.prototype.returnToParent = function () {
        this.history.back();
    };
    NavigationController.prototype.pop = function (location) {
        this.abortLoad();
        var token = location.token;
        var loadedEntry = token && this.entries[token];
        if (loadedEntry) {
            this.commit('pop', loadedEntry);
        }
        else {
            this.navigate('pop', location.uri, token || generateToken());
        }
    };
    NavigationController.prototype.abortLoad = function () {
        if (!this.loadSubscription.closed) {
            this.loadSubscription.unsubscribe();
            this.delegate.didAbortLoad();
        }
    };
    NavigationController.prototype.navigate = function (type, uri, token, stacked) {
        var _this = this;
        if (stacked === void 0) { stacked = false; }
        var sourceToken = this.currentEntry ? this.currentEntry.token : null;
        this.delegate.willLoad();
        this.loadSubscription = this.load(uri, token, sourceToken, stacked).subscribe(function (entry) {
            _this.delegate.didLoad();
            if (entry.isRedirect && type === 'pop') {
                // 'pop' does not apply changed uri to address bar
                // TODO: test this behavior
                type = 'push';
            }
            _this.commit(type, entry);
        }); // TODO: handle onError
    };
    NavigationController.prototype.load = function (uri, token, sourceToken, isStacked, isRedirect) {
        var _this = this;
        if (isRedirect === void 0) { isRedirect = false; }
        return this.stateLoader({ uri: uri, stacked: isStacked && sourceToken != null })
            .switchMap(function (result) {
            if (result instanceof app_1.Redirect) {
                return _this.load(result.uri, generateToken(), sourceToken, result.options.stacked || false, true);
            }
            else {
                return Observable_1.Observable.of({
                    uri: uri,
                    token: token,
                    state: result,
                    isRedirect: isRedirect,
                    parentToken: isStacked ? sourceToken : null,
                });
            }
        });
    };
    NavigationController.prototype.commit = function (type, entry) {
        this.currentEntry = entry;
        this.entries[entry.token] = entry;
        this.entryTokens.push(entry.token);
        this.pruneOldEntries();
        switch (type) {
            case 'replace':
                if (entry.isRedirect) {
                    this.history.replaceLocation({ uri: entry.uri, token: entry.token });
                }
                else {
                    this.history.setHistoryToken(entry.token);
                }
                break;
            case 'push':
                this.history.pushLocation({ uri: entry.uri, token: entry.token });
                break;
            case 'pop':
                // Keep history untouched as the event originates from history
                break;
        }
        this.delegate.didCommitLoad(entry.state, this.getAncestorStates());
    };
    NavigationController.prototype.getAncestorStates = function () {
        var ancestors = [];
        var e = this.currentEntry;
        var seen = {};
        while (e && e.parentToken) {
            seen[e.token] = true;
            e = this.entries[e.parentToken];
            if (seen[e.token]) {
                throw new Error('Cycle detected');
            }
            if (e) {
                ancestors.unshift(e.state);
            }
        }
        return ancestors;
    };
    NavigationController.prototype.pruneOldEntries = function (maxSize) {
        var _this = this;
        if (maxSize === void 0) { maxSize = 5; }
        var e = this.currentEntry;
        var keep = {};
        while (e && e.parentToken) {
            keep[e.token] = true;
            e = this.entries[e.parentToken];
            if (keep[e.token]) {
                throw new Error('Cycle detected');
            }
        }
        var cachedCount = 0;
        for (var i = this.entryTokens.length - 1; i >= 0; i--) {
            var token = this.entryTokens[i];
            if (keep[token]) {
                continue;
            }
            keep[token] = true;
            cachedCount++;
            if (cachedCount >= maxSize) {
                break;
            }
        }
        Object.keys(this.entries).forEach(function (token) {
            if (!keep[token]) {
                delete _this.entries[token];
            }
        });
        this.entryTokens = this.entryTokens.filter(function (token) { return _this.entries[token]; });
    };
    return NavigationController;
}());
exports.NavigationController = NavigationController;
//# sourceMappingURL=navigation.js.map