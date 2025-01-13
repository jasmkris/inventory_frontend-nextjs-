'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var io5_1 = require("react-icons/io5");
function FilterButton(_a) {
    var options = _a.options, onFilter = _a.onFilter;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    return (React.createElement("div", { className: "relative" },
        React.createElement("button", { onClick: function () { return setIsOpen(!isOpen); }, className: "p-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" },
            React.createElement(io5_1.IoFilter, { className: "w-6 h-6 text-gray-600" })),
        isOpen && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "fixed inset-0 z-10", onClick: function () { return setIsOpen(false); } }),
            React.createElement("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 py-2" }, options.map(function (option) { return (React.createElement("button", { key: option.value, onClick: function () {
                    onFilter(option.value);
                    setIsOpen(false);
                }, className: "w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50" }, option.label)); }))))));
}
exports["default"] = FilterButton;
