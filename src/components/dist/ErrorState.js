"use strict";
exports.__esModule = true;
exports.ErrorState = void 0;
function ErrorState(_a) {
    var message = _a.message, onRetry = _a.onRetry;
    return (React.createElement("div", { className: "flex flex-col items-center justify-center h-64" },
        React.createElement("p", { className: "text-red-600 mb-4" }, message),
        onRetry && (React.createElement("button", { onClick: onRetry, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" }, "Try Again"))));
}
exports.ErrorState = ErrorState;
