'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var fa_1 = require("react-icons/fa");
var bi_1 = require("react-icons/bi");
var hi_1 = require("react-icons/hi");
var io5_1 = require("react-icons/io5");
var react_2 = require("next-auth/react");
var ProfileSettingsSidebar_1 = require("@/components/ProfileSettingsSidebar");
var AccessManagementSidebar_1 = require("@/components/AccessManagementSidebar");
function Dashboard() {
    var _a, _b, _c, _d;
    var _e = react_1.useState(''), searchQuery = _e[0], setSearchQuery = _e[1];
    var _f = react_1.useState(false), isSettingsOpen = _f[0], setIsSettingsOpen = _f[1];
    var _g = react_1.useState(false), isAccessManagementOpen = _g[0], setIsAccessManagementOpen = _g[1];
    var session = react_2.useSession().data;
    var userRole = (((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role) || 'EMPLOYEE');
    var isManager = userRole === 'MANAGER';
    var recentActivity = [
        {
            type: 'Item Updated',
            description: 'Wine bottle moved from Cellar to Kitchen',
            time: '2h ago'
        },
        {
            type: 'Item Updated',
            description: 'Wine bottle moved from Cellar to Kitchen',
            time: '2h ago'
        },
        {
            type: 'Item Updated',
            description: 'Wine bottle moved from Cellar to Kitchen',
            time: '3h ago'
        },
    ];
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" },
        React.createElement("div", { className: "flex items-center justify-between mb-8" },
            React.createElement("div", { className: "relative flex-1 max-w-2xl" },
                React.createElement("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" })),
            React.createElement("div", { className: "flex items-center gap-2" },
                isManager && (React.createElement("button", { onClick: function () { return setIsAccessManagementOpen(true); }, className: "flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" },
                    React.createElement(io5_1.IoPerson, { className: "w-5 h-5" }),
                    React.createElement("span", null, "Access Management"))),
                React.createElement("button", { onClick: function () { return setIsSettingsOpen(true); }, className: "p-2 rounded-lg hover:bg-gray-100" },
                    React.createElement(io5_1.IoSettingsOutline, { className: "w-6 h-6 text-gray-600" })))),
        React.createElement("div", { className: "mb-8 text-center sm:text-left" },
            React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mb-2" }, "Welcome to Your Dashboard"),
            React.createElement("p", { className: "text-gray-600" }, "Manage your inventory efficiently")),
        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" },
            React.createElement(link_1["default"], { href: "/rooms", className: "block" },
                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" },
                    React.createElement("div", { className: "flex flex-col items-center" },
                        React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4" },
                            React.createElement(fa_1.FaHome, { className: "w-6 h-6 text-blue-500" })),
                        React.createElement("h2", { className: "text-xl font-semibold mb-2" }, "Rooms"),
                        React.createElement("p", { className: "text-gray-600 text-center" }, "Manage and organize rooms")))),
            React.createElement(link_1["default"], { href: "/objects", className: "block" },
                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" },
                    React.createElement("div", { className: "flex flex-col items-center" },
                        React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-4" },
                            React.createElement(bi_1.BiCube, { className: "w-6 h-6 text-green-500" })),
                        React.createElement("h2", { className: "text-xl font-semibold mb-2" }, "Objects"),
                        React.createElement("p", { className: "text-gray-600 text-center" }, "View and manage all items")))),
            React.createElement(link_1["default"], { href: "/history", className: "block" },
                React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" },
                    React.createElement("div", { className: "flex flex-col items-center" },
                        React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-4" },
                            React.createElement(hi_1.HiOutlineClock, { className: "w-6 h-6 text-purple-500" })),
                        React.createElement("h2", { className: "text-xl font-semibold mb-2" }, "History"),
                        React.createElement("p", { className: "text-gray-600 text-center" }, "Track all changes and movements"))))),
        React.createElement("div", { className: "bg-white rounded-lg shadow-sm p-6" },
            React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Recent Activity"),
            React.createElement("div", { className: "space-y-4" }, recentActivity.map(function (activity, index) { return (React.createElement("div", { key: index, className: "flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors" },
                React.createElement("div", { className: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" },
                    React.createElement(bi_1.BiCube, { className: "w-4 h-4 text-blue-500" })),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("h3", { className: "font-medium text-gray-900" }, activity.type),
                    React.createElement("p", { className: "text-gray-600 text-sm" }, activity.description)),
                React.createElement("span", { className: "text-sm text-gray-500" }, activity.time))); }))),
        isManager && (React.createElement(link_1["default"], { href: "#", onClick: function () { return setIsAccessManagementOpen(true); }, className: "block" },
            React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mb-4" },
                        React.createElement(io5_1.IoPerson, { className: "w-6 h-6 text-orange-500" })),
                    React.createElement("h2", { className: "text-xl font-semibold mb-2" }, "Access"),
                    React.createElement("p", { className: "text-gray-600 text-center" }, "Manage team access"))))),
        React.createElement("button", { className: "fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors" },
            React.createElement("span", { className: "text-2xl" }, "+")),
        React.createElement(ProfileSettingsSidebar_1["default"], { isOpen: isSettingsOpen, onClose: function () { return setIsSettingsOpen(false); }, user: {
                name: ((_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.name) || 'John Doe',
                email: ((_c = session === null || session === void 0 ? void 0 : session.user) === null || _c === void 0 ? void 0 : _c.email) || 'john.doe@example.com',
                image: ((_d = session === null || session === void 0 ? void 0 : session.user) === null || _d === void 0 ? void 0 : _d.image) || undefined
            } }),
        React.createElement(AccessManagementSidebar_1["default"], { isOpen: isAccessManagementOpen, onClose: function () { return setIsAccessManagementOpen(false); }, currentUserRole: userRole })));
}
exports["default"] = Dashboard;
