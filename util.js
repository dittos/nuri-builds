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
exports.parseURI = exports.uriToString = void 0;
var querystring = __importStar(require("querystring"));
var isString = require("lodash/isString");
function uriToString(parsed) {
    if (isString(parsed)) {
        return parsed;
    }
    var path = parsed.path;
    var query = querystring.stringify(parsed.query);
    if (query)
        path += '?' + query;
    return path;
}
exports.uriToString = uriToString;
function parseURI(uri) {
    var queryStart = uri.indexOf('?');
    if (queryStart < 0)
        return {
            path: uri,
            query: {},
        };
    else
        return {
            path: uri.substring(0, queryStart),
            query: querystring.parse(uri.substring(queryStart + 1)),
        };
}
exports.parseURI = parseURI;
//# sourceMappingURL=util.js.map