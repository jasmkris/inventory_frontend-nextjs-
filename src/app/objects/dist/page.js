'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var io5_1 = require("react-icons/io5");
var bi_1 = require("react-icons/bi");
var react_2 = require("next-auth/react");
function ObjectsPage() {
    var _a;
    var _b = react_1.useState(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var session = react_2.useSession().data;
    var userRole = (((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role) || 'EMPLOYEE');
    // Mock data - replace with actual API call
    var objects = [
        {
            id: '1',
            name: 'Power Tools Set',
            category: 'Tools',
            room: 'Main Garage',
            quantity: 1
        },
        {
            id: '2',
            name: 'Garden Equipment',
            category: 'Garden',
            room: 'Main Garage',
            quantity: 3
        },
        {
            id: '3',
            name: 'Spare Tires',
            category: 'Automotive',
            room: 'Main Garage',
            quantity: 4
        },
        {
            id: '4',
            name: 'Tool Box',
            category: 'Tools',
            room: 'Main Garage',
            quantity: 2
        },
        {
            id: '5',
            name: 'Lawn Mower',
            category: 'Garden',
            room: 'Main Garage',
            quantity: 1
        },
        {
            id: '6',
            name: 'Bordeaux 2015',
            category: 'Red Wine',
            room: 'Wine Cellar',
            quantity: 12
        },
    ];
    var filteredObjects = objects.filter(function (object) {
        return object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            object.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            object.room.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" },
        React.createElement(link_1["default"], { href: "/dashboard", className: "inline-flex items-center text-blue-500 hover:text-blue-600 mb-6" },
            React.createElement(io5_1.IoChevronBack, { className: "w-5 h-5 mr-1" }),
            "Back to Dashboard"),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mb-2" }, "Objects"),
            React.createElement("p", { className: "text-gray-600" }, "View and manage all items")),
        React.createElement("div", { className: "flex gap-4 mb-6" },
            React.createElement("div", { className: "relative flex-1" },
                React.createElement("input", { type: "text", placeholder: "Search objects...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" })),
            React.createElement("button", { className: "p-2 rounded-lg border border-gray-200 hover:bg-gray-50" },
                React.createElement(io5_1.IoFilter, { className: "w-6 h-6 text-gray-600" }))),
        React.createElement("div", { className: "space-y-4" }, filteredObjects.map(function (object) { return (React.createElement(link_1["default"], { key: object.id, href: "/objects/" + object.id, className: "block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow" },
            React.createElement("div", { className: "p-4 sm:p-6 flex items-center justify-between" },
                React.createElement("div", { className: "flex items-start space-x-4" },
                    React.createElement("div", { className: "w-10 h-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center" },
                        React.createElement(bi_1.BiCube, { className: "w-6 h-6 text-blue-500" })),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-lg font-semibold text-gray-900" }, object.name),
                        React.createElement("div", { className: "flex items-center text-sm text-gray-600 mt-1" },
                            React.createElement("span", null, object.category),
                            React.createElement("span", { className: "mx-2" }, "\u2022"),
                            React.createElement("span", null, object.room)))),
                React.createElement("div", { className: "flex items-center space-x-4" },
                    React.createElement("div", { className: "text-right" },
                        React.createElement("span", { className: "text-sm text-gray-500" }, "Qty: "),
                        React.createElement("span", { className: "font-medium" }, object.quantity)),
                    React.createElement(io5_1.IoChevronForward, { className: "w-5 h-5 text-gray-400" }))))); })),
        React.createElement("button", { className: "fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors" },
            React.createElement("span", { className: "text-2xl" }, "+"))));
}
exports["default"] = ObjectsPage;
