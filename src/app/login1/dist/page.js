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
var react_1 = require("react");
var link_1 = require("next/link");
var react_2 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var fi_1 = require("react-icons/fi");
var md_1 = require("react-icons/md");
function LoginPage() {
    var _this = this;
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = react_1.useState(false), rememberMe = _d[0], setRememberMe = _d[1];
    var _e = react_1.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState(''), error = _f[0], setError = _f[1];
    var router = navigation_1.useRouter();
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, react_2.signIn('credentials', {
                            redirect: false,
                            email: email,
                            password: password
                        })];
                case 2:
                    result = _a.sent();
                    if (result === null || result === void 0 ? void 0 : result.error) {
                        setError('Invalid email or password');
                    }
                    else {
                        router.push('/dashboard');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    setError('An error occurred. Please try again.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var copyToClipboard = function (text) {
        navigator.clipboard.writeText(text);
    };
    return (React.createElement("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "w-full max-w-md" },
            React.createElement("div", { className: "flex mb-6" },
                React.createElement("button", { className: "flex-1 py-4 text-center border-b-2 border-blue-500 text-blue-500 font-medium" }, "Login"),
                React.createElement(link_1["default"], { href: "/register", className: "flex-1 py-4 text-center border-b-2 border-gray-200 text-gray-500 hover:text-gray-700 transition-colors" }, "Register")),
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mb-2" }, "Welcome Back"),
                React.createElement("p", { className: "text-gray-600" }, "Log in to manage your inventory")),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1" }, "Email"),
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "email", type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your email", required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return copyToClipboard(email); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" },
                            React.createElement(md_1.MdContentCopy, { className: "w-5 h-5" })))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1" }, "Password"),
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "password", type: showPassword ? 'text' : 'password', value: password, onChange: function (e) { return setPassword(e.target.value); }, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your password", required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return setShowPassword(!showPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" }, showPassword ? (React.createElement(fi_1.FiEyeOff, { className: "w-5 h-5" })) : (React.createElement(fi_1.FiEye, { className: "w-5 h-5" }))))),
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("input", { id: "remember-me", type: "checkbox", checked: rememberMe, onChange: function (e) { return setRememberMe(e.target.checked); }, className: "h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" }),
                    React.createElement("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700" }, "Remember me")),
                error && (React.createElement("div", { className: "text-red-500 text-sm text-center" }, error)),
                React.createElement("button", { type: "submit", disabled: isLoading, className: "w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" }, isLoading ? 'Logging in...' : 'Login')))));
}
exports["default"] = LoginPage;
