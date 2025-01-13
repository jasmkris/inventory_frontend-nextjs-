'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var io5_1 = require("react-icons/io5");
var fi_1 = require("react-icons/fi");
function AccessManagementSidebar(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, currentUserRole = _a.currentUserRole;
    var _b = react_1.useState(''), inviteLink = _b[0], setInviteLink = _b[1];
    var _c = react_1.useState([
        {
            id: '1',
            name: 'Alice Smith',
            email: 'alice@example.com',
            role: 'EMPLOYEE',
            status: 'PENDING'
        },
        {
            id: '2',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'EMPLOYEE',
            status: 'PENDING'
        },
    ]), pendingUsers = _c[0], setPendingUsers = _c[1];
    var _d = react_1.useState([
        {
            id: '3',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            role: 'EMPLOYEE',
            status: 'ACTIVE'
        },
        {
            id: '4',
            name: 'Mike Brown',
            email: 'mike@example.com',
            role: 'MANAGER',
            status: 'ACTIVE'
        },
    ]), activeUsers = _d[0], setActiveUsers = _d[1];
    var handleGenerateInviteLink = function () {
        // Generate a unique invite link
        var newLink = window.location.origin + "/register?invite=" + Date.now();
        setInviteLink(newLink);
    };
    var handleCopyInviteLink = function () {
        navigator.clipboard.writeText(inviteLink);
    };
    var handleApproveUser = function (userId) {
        setPendingUsers(function (prev) { return prev.filter(function (user) { return user.id !== userId; }); });
        var approvedUser = pendingUsers.find(function (user) { return user.id === userId; });
        if (approvedUser) {
            setActiveUsers(function (prev) { return __spreadArrays(prev, [__assign(__assign({}, approvedUser), { status: 'ACTIVE' })]); });
        }
    };
    var handleRejectUser = function (userId) {
        setPendingUsers(function (prev) { return prev.filter(function (user) { return user.id !== userId; }); });
    };
    var handleRevokeAccess = function (userId) {
        setActiveUsers(function (prev) { return prev.filter(function (user) { return user.id !== userId; }); });
    };
    // Only managers can see and use this component
    if (currentUserRole !== 'MANAGER') {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        isOpen && (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25 z-40", onClick: onClose })),
        React.createElement("div", { className: "fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out " + (isOpen ? 'translate-x-0' : 'translate-x-full') + " overflow-y-auto" },
            React.createElement("div", { className: "p-6" },
                React.createElement("div", { className: "flex items-center justify-between mb-8" },
                    React.createElement("h2", { className: "text-xl font-semibold" }, "Access Management"),
                    React.createElement("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full transition-colors" },
                        React.createElement(io5_1.IoClose, { className: "w-6 h-6" }))),
                React.createElement("button", { onClick: handleGenerateInviteLink, className: "w-full py-3 px-4 mb-6 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors" },
                    React.createElement(io5_1.IoPerson, { className: "w-5 h-5" }),
                    "Invite New User"),
                inviteLink && (React.createElement("div", { className: "mb-8 p-4 bg-gray-50 rounded-lg" },
                    React.createElement("p", { className: "text-sm text-gray-600 mb-2" }, "Invitation Link:"),
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("input", { type: "text", value: inviteLink, readOnly: true, className: "flex-1 text-sm p-2 border rounded" }),
                        React.createElement("button", { onClick: handleCopyInviteLink, className: "p-2 text-blue-500 hover:text-blue-600" }, "Copy")))),
                React.createElement("div", { className: "mb-8" },
                    React.createElement("h3", { className: "text-lg font-medium mb-4" }, "Pending Access Requests"),
                    React.createElement("div", { className: "space-y-4" }, pendingUsers.map(function (user) { return (React.createElement("div", { key: user.id, className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "font-medium" }, user.name),
                            React.createElement("p", { className: "text-sm text-gray-600" }, user.email),
                            React.createElement("p", { className: "text-sm text-gray-500" }, user.role)),
                        React.createElement("div", { className: "flex gap-2" },
                            React.createElement("button", { onClick: function () { return handleApproveUser(user.id); }, className: "p-2 text-green-500 hover:bg-green-50 rounded-full" },
                                React.createElement(fi_1.FiCheck, { className: "w-5 h-5" })),
                            React.createElement("button", { onClick: function () { return handleRejectUser(user.id); }, className: "p-2 text-red-500 hover:bg-red-50 rounded-full" },
                                React.createElement(fi_1.FiX, { className: "w-5 h-5" }))))); }))),
                React.createElement("div", null,
                    React.createElement("h3", { className: "text-lg font-medium mb-4" }, "Active Users"),
                    React.createElement("div", { className: "space-y-4" }, activeUsers.map(function (user) { return (React.createElement("div", { key: user.id, className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "font-medium" }, user.name),
                            React.createElement("p", { className: "text-sm text-gray-600" }, user.email),
                            React.createElement("p", { className: "text-sm text-gray-500" }, user.role)),
                        user.role !== 'MANAGER' && (React.createElement("button", { onClick: function () { return handleRevokeAccess(user.id); }, className: "text-red-500 text-sm hover:text-red-600" }, "Revoke Access")))); })))))));
}
exports["default"] = AccessManagementSidebar;
