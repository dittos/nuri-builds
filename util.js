"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
function uriToString(parsed) {
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