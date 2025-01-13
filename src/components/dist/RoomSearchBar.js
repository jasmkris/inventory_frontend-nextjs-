'use client';
"use strict";
exports.__esModule = true;
var io5_1 = require("react-icons/io5");
function RoomSearchBar(_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("div", { className: "relative" },
        React.createElement("div", { className: "absolute inset-y-0 left-3 flex items-center pointer-events-none" },
            React.createElement(io5_1.IoSearchOutline, { className: "h-5 w-5 text-gray-400" })),
        React.createElement("input", { type: "text", value: value, onChange: function (e) { return onChange(e.target.value); }, placeholder: "Search rooms...", className: "w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" })));
}
exports["default"] = RoomSearchBar;
