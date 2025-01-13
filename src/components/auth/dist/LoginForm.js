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
exports.LoginForm = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var auth_context_1 = require("@/contexts/auth-context");
var use_toast_1 = require("@/hooks/use-toast");
function LoginForm(_a) {
    var _this = this;
    var form = _a.form, onSubmit = _a.onSubmit, isLoading = _a.isLoading;
    var login = auth_context_1.useAuth().login;
    var toast = use_toast_1.useToast().toast;
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var register = form.register, errors = form.formState.errors;
    var handleSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, login(data.email, data.password)];
                case 1:
                    _a.sent();
                    toast({
                        title: 'Success',
                        description: 'Logged in successfully'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    toast({
                        title: 'Error',
                        description: 'Invalid email or password',
                        variant: 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "w-full max-w-md bg-white rounded-lg shadow-sm p-6" },
        react_1["default"].createElement("div", { className: "text-center mb-6" },
            react_1["default"].createElement("h1", { className: "text-2xl font-semibold mb-1" }, "Welcome Back"),
            react_1["default"].createElement("p", { className: "text-gray-600" }, "Log in to manage your inventory")),
        react_1["default"].createElement("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-4" },
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Email"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('email'), { type: "email", placeholder: "Enter your email", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", disabled: isLoading })),
                    errors.email && (react_1["default"].createElement("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-red-500" }, "\u26A0"))),
                errors.email && (react_1["default"].createElement("p", { className: "text-sm text-red-500" }, errors.email.message))),
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Password"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('password'), { type: showPassword ? 'text' : 'password', placeholder: "Enter your password", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10", disabled: isLoading })),
                    react_1["default"].createElement("button", { type: "button", onClick: function () { return setShowPassword(!showPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" }, showPassword ? react_1["default"].createElement(lucide_react_1.EyeOff, { size: 20 }) : react_1["default"].createElement(lucide_react_1.Eye, { size: 20 })),
                    errors.password && (react_1["default"].createElement("span", { className: "absolute right-10 top-1/2 -translate-y-1/2 text-red-500" }, "\u26A0"))),
                errors.password && (react_1["default"].createElement("p", { className: "text-sm text-red-500" }, errors.password.message))),
            react_1["default"].createElement("div", { className: "flex items-center" },
                react_1["default"].createElement("input", __assign({}, register('rememberMe'), { type: "checkbox", id: "remember", className: "w-4 h-4 rounded border-gray-300", disabled: isLoading })),
                react_1["default"].createElement("label", { htmlFor: "remember", className: "ml-2 text-sm text-gray-600" }, "Remember me")),
            react_1["default"].createElement("button", { type: "submit", disabled: isLoading, className: "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50" }, isLoading ? (react_1["default"].createElement(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin mx-auto" })) : ('Login')))));
}
exports.LoginForm = LoginForm;
