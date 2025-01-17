'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("next-auth/react");
var routes_1 = require("@/config/routes");
function Navigation() {
    var _a;
    var pathname = navigation_1.usePathname();
    var session = react_1.useSession().data;
    var isManager = ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.role) === 'MANAGER';
    var allRoutes = isManager ? __spreadArrays(routes_1.routes, routes_1.managerRoutes) : routes_1.routes;
    return (React.createElement("nav", { className: "p-4 bg-background border-b flex justify-between items-center" },
        React.createElement("ul", { className: "flex gap-4" }, allRoutes.map(function (route) { return (React.createElement("li", { key: route.path },
            React.createElement(link_1["default"], { href: route.path, className: (pathname === route.path
                    ? 'text-foreground font-bold'
                    : 'text-foreground/60') + " hover:text-foreground transition-colors" }, route.label))); })),
        React.createElement("div", { className: "flex gap-4" },
<<<<<<< HEAD
            React.createElement(link_1["default"], { href: "/login", className: "flex items-center justify-center" }, "login"))));
=======
            React.createElement(link_1["default"], { href: "/login", className: "flex items-center justify-center" }, "login"),
            React.createElement(link_1["default"], { href: "/register", className: "flex items-center justify-center" }, "signup"))));
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
}
exports["default"] = Navigation;
