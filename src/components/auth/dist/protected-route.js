'use client';
"use strict";
exports.__esModule = true;
exports.ProtectedRoute = void 0;
var auth_context_1 = require("@/contexts/auth-context");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var LoadingState_1 = require("@/components/LoadingState");
function ProtectedRoute(_a) {
    var children = _a.children;
    var _b = auth_context_1.useAuth(), user = _b.user, loading = _b.loading;
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);
    if (loading) {
        return React.createElement(LoadingState_1.LoadingState, null);
    }
    if (!user) {
        return null;
    }
    return React.createElement(React.Fragment, null, children);
}
exports.ProtectedRoute = ProtectedRoute;
