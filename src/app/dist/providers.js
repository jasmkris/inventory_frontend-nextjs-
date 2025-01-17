'use client';
"use strict";
exports.__esModule = true;
exports.Providers = void 0;
var auth_context_1 = require("@/contexts/auth-context");
var toaster_1 = require("@/components/ui/toaster");
var react_1 = require("next-auth/react");
function Providers(_a) {
    var children = _a.children;
    return (React.createElement(react_1.SessionProvider, null,
        React.createElement(auth_context_1.AuthProvider, null,
            children,
            React.createElement(toaster_1.Toaster, null))));
}
exports.Providers = Providers;
