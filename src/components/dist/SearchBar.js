'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var io5_1 = require("react-icons/io5");
function SearchBar(_a) {
    var onSearch = _a.onSearch, _b = _a.placeholder, placeholder = _b === void 0 ? 'Search...' : _b;
    var _c = react_1.useState(''), query = _c[0], setQuery = _c[1];
    var handleSearch = function (e) {
        var value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    return (React.createElement("div", { className: "relative flex-1 max-w-2xl" },
        React.createElement("div", { className: "absolute inset-y-0 left-3 flex items-center pointer-events-none" },
            React.createElement(io5_1.IoSearchOutline, { className: "h-5 w-5 text-gray-400" })),
        React.createElement("input", { type: "text", value: query, onChange: handleSearch, placeholder: placeholder, className: "w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" })));
}
exports["default"] = SearchBar;
