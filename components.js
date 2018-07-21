"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var util_1 = require("./util");
var ControllerProvider = /** @class */ (function (_super) {
    __extends(ControllerProvider, _super);
    function ControllerProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    ControllerProvider.prototype.getChildContext = function () {
        return { controller: this.props.controller };
    };
    ControllerProvider.childContextTypes = {
        controller: PropTypes.object
    };
    return ControllerProvider;
}(React.Component));
exports.ControllerProvider = ControllerProvider;
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function Link(props, context) {
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
        if (allowTransition && context && context.controller) {
            context.controller.load(uri, { stacked: stacked, returnToParent: returnToParent });
        }
    }
    var href = util_1.uriToString(uri);
    return React.createElement("a", __assign({}, restProps, { href: href, onClick: handleClick }));
}
exports.Link = Link;
Link.contextTypes = {
    controller: PropTypes.object
};
function Null() {
    return null;
}
function createRouteElement(component, props) {
    if (!component)
        return React.createElement(Null, null);
    return React.createElement(ControllerProvider, { controller: props.controller }, React.createElement(component, props));
}
exports.createRouteElement = createRouteElement;
//# sourceMappingURL=components.js.map