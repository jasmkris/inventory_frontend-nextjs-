'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var io5_1 = require("react-icons/io5");
var bi_1 = require("react-icons/bi");
var react_2 = require("next-auth/react");
function HistoryPage() {
    var _a = react_1.useState(''), searchQuery = _a[0], setSearchQuery = _a[1];
    var session = react_2.useSession().data;
    // Mock data - replace with actual API call
    var historyItems = [
        {
            id: '1',
            objectName: 'Wine Glasses',
            action: 'MOVED',
            description: 'Moved from Kitchen to Storage',
            quantity: 6,
            timestamp: new Date('2024-01-10T02:30:00'),
            user: { name: 'John Doe' }
        },
        {
            id: '2',
            objectName: 'Bordeaux 2015',
            action: 'REMOVED',
            description: 'Removed from Wine Cellar - Consumed during dinner party',
            quantity: 1,
            timestamp: new Date('2024-01-10T01:15:00'),
            user: { name: 'Sarah Smith' }
        },
        {
            id: '3',
            objectName: 'Towels',
            action: 'MOVED',
            description: 'Moved from Laundry to Master Bedroom',
            quantity: 8,
            timestamp: new Date('2024-01-10T11:45:00'),
            user: { name: 'Maria Garcia' }
        },
        {
            id: '4',
            objectName: 'Garden Tools',
            action: 'MODIFIED',
            description: 'Modified in Main Garage - Updated quantity from 3 to 4',
            quantity: 4,
            timestamp: new Date('2024-01-10T10:20:00'),
            user: { name: 'John Doe' }
        },
        {
            id: '5',
            objectName: 'Pool Chemicals',
            action: 'REMOVED',
            description: 'Removed from Pool House - Used for pool maintenance',
            quantity: 2,
            timestamp: new Date('2024-01-10T09:30:00'),
            user: { name: 'Sarah Smith' }
        },
    ];
    var getActionIcon = function (action) {
        switch (action) {
            case 'MOVED':
                return React.createElement(bi_1.BiTransfer, { className: "w-5 h-5 text-blue-500" });
            case 'REMOVED':
                return React.createElement(bi_1.BiTrash, { className: "w-5 h-5 text-red-500" });
            case 'MODIFIED':
                return React.createElement(bi_1.BiEdit, { className: "w-5 h-5 text-green-500" });
        }
    };
    var filteredHistory = historyItems.filter(function (item) {
        return item.objectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" },
        React.createElement(link_1["default"], { href: "/dashboard", className: "inline-flex items-center text-blue-500 hover:text-blue-600 mb-6" },
            React.createElement(io5_1.IoChevronBack, { className: "w-5 h-5 mr-1" }),
            "Back to Dashboard"),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mb-2" }, "History"),
            React.createElement("p", { className: "text-gray-600" }, "Track all changes and movements")),
        React.createElement("div", { className: "flex gap-4 mb-6" },
            React.createElement("div", { className: "relative flex-1" },
                React.createElement("input", { type: "text", placeholder: "Search history...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" })),
            React.createElement("button", { className: "p-2 rounded-lg border border-gray-200 hover:bg-gray-50" },
                React.createElement(io5_1.IoFilter, { className: "w-6 h-6 text-gray-600" }))),
        React.createElement("div", { className: "space-y-4" }, filteredHistory.map(function (item) { return (React.createElement("div", { key: item.id, className: "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow" },
            React.createElement("div", { className: "p-4 sm:p-6" },
                React.createElement("div", { className: "flex items-start gap-4" },
                    React.createElement("div", { className: "w-10 h-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center" }, getActionIcon(item.action)),
                    React.createElement("div", { className: "flex-1 min-w-0" },
                        React.createElement("div", { className: "flex items-start justify-between gap-x-4" },
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-lg font-semibold text-gray-900" }, item.objectName),
                                React.createElement("p", { className: "text-gray-600 mt-1" }, item.description)),
                            React.createElement("div", { className: "text-right flex-shrink-0" },
                                React.createElement("div", { className: "text-sm text-gray-500" },
                                    "Qty: ",
                                    item.quantity))),
                        React.createElement("div", { className: "mt-2 flex items-center text-sm text-gray-500" },
                            React.createElement("span", null, new Date(item.timestamp).toLocaleString()),
                            React.createElement("span", { className: "mx-2" }, "\u2022"),
                            React.createElement("span", null, item.user.name))))))); }))));
}
exports["default"] = HistoryPage;
