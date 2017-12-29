"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOMServer = require("react-dom/server");
var app_1 = require("./app");
var components_1 = require("./components");
var _loaderFactory;
function injectLoaderFactory(loaderFactory) {
    _loaderFactory = loaderFactory;
}
exports.injectLoaderFactory = injectLoaderFactory;
// eslint-disable-next-line no-unused-vars
function noOpWriteData(updater) { }
function render(app, serverRequest) {
    var _a = app_1.matchRoute(app, serverRequest), handler = _a.handler, params = _a.params;
    var request = app_1.createRequest({
        app: app,
        loader: _loaderFactory(serverRequest),
        path: serverRequest.path,
        query: serverRequest.query,
        params: params,
    });
    var loadPromise = handler.load ?
        handler.load(request)
        : Promise.resolve({});
    return loadPromise.then(function (response) { return createResult(request, handler, response); }, function (err) { return err.status ?
        createResult(request, handler, {}, err.status)
        : Promise.reject(err); });
}
exports.render = render;
function createResult(request, handler, response, errorStatus) {
    if (app_1.isRedirect(response)) {
        return {
            preloadData: {},
            title: '',
            meta: {},
            redirectURI: response.uri,
            getHTML: function () { return ''; },
        };
    }
    var data = response;
    var element = components_1.createRouteElement(handler.component, {
        data: data,
        writeData: noOpWriteData,
        loader: request.loader,
    });
    return {
        preloadData: data,
        title: app_1.renderTitle(request.app, handler, data),
        meta: handler.renderMeta ? handler.renderMeta(data) : {},
        errorStatus: errorStatus,
        element: element,
        getHTML: function () {
            return ReactDOMServer.renderToString(element);
        }
    };
}
//# sourceMappingURL=server.js.map