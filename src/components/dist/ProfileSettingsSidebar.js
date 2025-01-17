'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var image_1 = require("next/image");
var io5_1 = require("react-icons/io5");
var fi_1 = require("react-icons/fi");
var react_1 = require("next-auth/react");
function ProfileSettingsSidebar(_a) {
    var _this = this;
    var isOpen = _a.isOpen, onClose = _a.onClose, user = _a.user;
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, react_1.signOut({ callbackUrl: '/login' })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        isOpen && (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25 z-40", onClick: onClose })),
        React.createElement("div", { className: "fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out " + (isOpen ? 'translate-x-0' : 'translate-x-full') },
            React.createElement("div", { className: "p-6" },
                React.createElement("div", { className: "flex items-center justify-between mb-8" },
                    React.createElement("h2", { className: "text-xl font-semibold" }, "Profile Settings"),
                    React.createElement("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full transition-colors" },
                        React.createElement(io5_1.IoClose, { className: "w-6 h-6" }))),
                React.createElement("div", { className: "flex items-center gap-4 mb-8" },
                    React.createElement("div", { className: "w-16 h-16 rounded-full bg-gray-200 overflow-hidden" }, user.image ? (React.createElement(image_1["default"], { src: user.image, alt: user.name, width: 64, height: 64, className: "w-full h-full object-cover" })) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center bg-blue-100" },
                        React.createElement("span", { className: "text-2xl text-blue-500" }, user.name.charAt(0).toUpperCase())))),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-medium text-gray-900" }, user.name),
                        React.createElement("p", { className: "text-gray-600 text-sm" }, user.email))),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("button", { className: "w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement(fi_1.FiUser, { className: "w-5 h-5 text-gray-500" }),
                            React.createElement("span", null, "Edit Profile")),
                        React.createElement(fi_1.FiChevronRight, { className: "w-5 h-5 text-gray-400" })),
                    React.createElement("button", { className: "w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement(fi_1.FiKey, { className: "w-5 h-5 text-gray-500" }),
                            React.createElement("span", null, "Change Password")),
                        React.createElement(fi_1.FiChevronRight, { className: "w-5 h-5 text-gray-400" })),
                    React.createElement("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors" },
                        React.createElement(fi_1.FiLogOut, { className: "w-5 h-5" }),
                        React.createElement("span", null, "Logout")))))));
}
exports["default"] = ProfileSettingsSidebar;
