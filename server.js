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
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var ReactDOMServer = __importStar(require("react-dom/server"));
var app_1 = require("./app");
var app_2 = require("./app");
var components_1 = require("./components");
var bootstrap_1 = require("./bootstrap");
// eslint-disable-next-line no-unused-vars
function noOpWriteData(updater) { }
function render(app, serverRequest, loader) {
    var match = app_2.matchRoute(app, serverRequest);
    if (!match) {
        return Promise.resolve(createNotFoundResult());
    }
    var handler = match.handler, params = match.params, routeId = match.routeId;
    var request = app_2.createRequest({
        loader: loader,
        uri: serverRequest.url,
        path: serverRequest.path,
        query: serverRequest.query,
        params: params,
    });
    var loadPromise = handler.load ?
        handler.load(request)
        : Promise.resolve({});
    return loadPromise.then(function (response) { return createResult(app, request, handler, response, routeId); }, function (err) { return Promise.reject(err); });
}
exports.render = render;
function createNotFoundResult() {
    return {
        preloadData: {},
        title: '',
        meta: {},
        errorStatus: 404,
        getHTML: function () { return ''; },
        routeId: undefined,
    };
}
function createResult(app, request, handler, response, routeId) {
    if (app_2.isRedirect(response)) {
        return {
            preloadData: {},
            title: '',
            meta: {},
            redirectURI: response.uri,
            getHTML: function () { return ''; },
            routeId: undefined,
        };
    }
    if (app_1.isNotFound(response)) {
        return createNotFoundResult();
    }
    var data = response;
    var element = components_1.createRouteElement(handler.component, {
        data: data,
        writeData: noOpWriteData,
        loader: request.loader,
    });
    return {
        preloadData: data,
        title: app_2.renderTitle(app, handler, data),
        meta: handler.renderMeta ? handler.renderMeta(data) : {},
        element: element,
        getHTML: function () {
            return bootstrap_1.wrapHTML(ReactDOMServer.renderToString(element));
        },
        routeId: routeId,
    };
}
//# sourceMappingURL=server.js.map