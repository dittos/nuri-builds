"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/observable/never");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
function createHistory() {
    if (supportsHistory())
        return new BrowserHistory();
    else
        return new FallbackHistory();
}
exports.createHistory = createHistory;
var BrowserHistory = /** @class */ (function () {
    function BrowserHistory() {
    }
    BrowserHistory.prototype.locationChanges = function () {
        var _this = this;
        return Observable_1.Observable.fromEvent(window, 'popstate')
            .filter(function (event) { return event.state !== undefined; })
            .map(function () { return _this.getLocation(); });
    };
    BrowserHistory.prototype.getLocation = function () {
        return {
            uri: location.pathname + location.search,
            token: history.state && history.state.token,
        };
    };
    BrowserHistory.prototype.setHistoryToken = function (token) {
        var path = location.pathname + location.search;
        history.replaceState({ token: token }, '', path);
    };
    BrowserHistory.prototype.pushLocation = function (_a) {
        var token = _a.token, uri = _a.uri;
        history.pushState({ token: token }, '', uri);
    };
    BrowserHistory.prototype.replaceLocation = function (_a) {
        var token = _a.token, uri = _a.uri;
        history.replaceState({ token: token }, '', uri);
    };
    BrowserHistory.prototype.doesPushLocationRefreshPage = function () {
        return false;
    };
    BrowserHistory.prototype.back = function () {
        history.back();
    };
    return BrowserHistory;
}());
exports.BrowserHistory = BrowserHistory;
var FallbackHistory = /** @class */ (function () {
    function FallbackHistory() {
    }
    FallbackHistory.prototype.getLocation = function () {
        return {
            uri: location.pathname + location.search,
            token: null,
        };
    };
    // eslint-disable-next-line no-unused-vars
    FallbackHistory.prototype.setHistoryToken = function (token) {
        // ignored
    };
    FallbackHistory.prototype.locationChanges = function () {
        return Observable_1.Observable.never();
    };
    FallbackHistory.prototype.pushLocation = function (_a) {
        var uri = _a.uri;
        window.location.href = uri;
    };
    FallbackHistory.prototype.doesPushLocationRefreshPage = function () {
        return true;
    };
    FallbackHistory.prototype.replaceLocation = function (_a) {
        var uri = _a.uri;
        window.location.replace(uri);
    };
    FallbackHistory.prototype.back = function () {
        history.back();
    };
    return FallbackHistory;
}());
exports.FallbackHistory = FallbackHistory;
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
function supportsHistory() {
    var ua = window.navigator.userAgent;
    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1)
        return false;
    return window.history && 'pushState' in window.history;
}
//# sourceMappingURL=history.js.map