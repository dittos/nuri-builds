"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHTML = exports.preludeScript = exports.globalVariableName = exports.containerElementId = void 0;
exports.containerElementId = '__nuri_root';
exports.globalVariableName = '__nuri';
exports.preludeScript = "(function(w,n){w[n]=w[n]||function(p){w[n].preloadData=p}})(window," + JSON.stringify(exports.globalVariableName) + ");";
function wrapHTML(content) {
    return "<div id=\"" + exports.containerElementId + "\">" + content + "</div><script>" + exports.preludeScript + "</script>";
}
exports.wrapHTML = wrapHTML;
//# sourceMappingURL=bootstrap.js.map