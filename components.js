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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteElement = exports.Link = exports.ControllerContext = void 0;
var React = require("react");
var util_1 = require("./util");
exports.ControllerContext = React.createContext(undefined);
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function Link(props) {
    var controller = React.useContext(exports.ControllerContext);
    var to = props.to, _a = props.queryParams, queryParams = _a === void 0 ? {} : _a, onClick = props.onClick, _b = props.stacked, stacked = _b === void 0 ? false : _b, _c = props.returnToParent, returnToParent = _c === void 0 ? false : _c, restProps = __rest(props, ["to", "queryParams", "onClick", "stacked", "returnToParent"]);
    var uri = {
        path: to,
        query: queryParams,
    };
    function handleClick(event) {
        var allowTransition = true;
        if (onClick)
            onClick(event);
        if (isModifiedEvent(event) || !isLeftClickEvent(event))
            return;
        if (event.defaultPrevented === true)
            allowTransition = false;
        // If target prop is set (e.g. to "_blank") let browser handle link.
        if (props.target) {
            if (!allowTransition)
                event.preventDefault();
            return;
        }
        event.preventDefault();
        if (allowTransition && controller) {
            controller.load(uri, { stacked: stacked, returnToParent: returnToParent });
        }
    }
    var href = util_1.uriToString(uri);
    return React.createElement("a", __assign({}, restProps, { href: href, onClick: handleClick }));
}
exports.Link = Link;
function Null() {
    return null;
}
function createRouteElement(component, props) {
    if (!component)
        return React.createElement(Null, null);
    return React.createElement(exports.ControllerContext.Provider, { value: props.controller }, React.createElement(component, props));
}
exports.createRouteElement = createRouteElement;
//# sourceMappingURL=components.js.map