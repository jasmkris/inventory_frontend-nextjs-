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
exports.RegistrationForm = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
function RegistrationForm(_a) {
    var _this = this;
    var form = _a.form, onSubmit = _a.onSubmit, isLoading = _a.isLoading;
    var toast = use_toast_1.useToast().toast;
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = react_1.useState(false), showConfirmPassword = _c[0], setShowConfirmPassword = _c[1];
    var _d = react_1.useState(null), previewSelfie = _d[0], setPreviewSelfie = _d[1];
    var _e = react_1.useState(false), isCameraOpen = _e[0], setIsCameraOpen = _e[1];
    var videoRef = react_1.useRef(null);
    var streamRef = react_1.useRef(null);
    var fileInputRef = react_1.useRef(null);
    var register = form.register, errors = form.formState.errors;
    var handleFileUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var imageUrl = URL.createObjectURL(file);
            setPreviewSelfie(imageUrl);
        }
    };
    var startCamera = function () { return __awaiter(_this, void 0, void 0, function () {
        var stream, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true })];
                case 1:
                    stream = _a.sent();
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setIsCameraOpen(true);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    toast({
                        title: "Error",
                        description: "Unable to access camera",
                        variant: "destructive"
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var stopCamera = function () {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(function (track) { return track.stop(); });
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };
    var takeSelfie = function () {
        if (videoRef.current) {
            var canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            var ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                var imageData = canvas.toDataURL('image/jpeg');
                setPreviewSelfie(imageData);
                stopCamera();
            }
        }
    };
    return (react_1["default"].createElement("div", { className: "w-full max-w-md bg-white rounded-lg shadow-sm p-6" },
        react_1["default"].createElement("div", { className: "text-center mb-6" },
            react_1["default"].createElement("h1", { className: "text-2xl font-semibold mb-1" }, "Create Account"),
            react_1["default"].createElement("p", { className: "text-gray-600" }, "Sign up to get started")),
        react_1["default"].createElement("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4" },
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Full Name"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('fullName'), { type: "text", placeholder: "Enter your full name", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", disabled: isLoading })),
                    errors.fullName && (react_1["default"].createElement("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-red-500" }, "\u26A0")))),
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Email"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('email'), { type: "email", placeholder: "Enter your email", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", disabled: isLoading })),
                    errors.email && (react_1["default"].createElement("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-red-500" }, "\u26A0")))),
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Password"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('password'), { type: showPassword ? 'text' : 'password', placeholder: "Create a password", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10", disabled: isLoading })),
                    react_1["default"].createElement("button", { type: "button", onClick: function () { return setShowPassword(!showPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" }, showPassword ? react_1["default"].createElement(lucide_react_1.EyeOff, { size: 20 }) : react_1["default"].createElement(lucide_react_1.Eye, { size: 20 })))),
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Confirm Password"),
                react_1["default"].createElement("div", { className: "relative" },
                    react_1["default"].createElement("input", __assign({}, register('confirmPassword'), { type: showConfirmPassword ? 'text' : 'password', placeholder: "Confirm your password", className: "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10", disabled: isLoading })),
                    react_1["default"].createElement("button", { type: "button", onClick: function () { return setShowConfirmPassword(!showConfirmPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" }, showConfirmPassword ? react_1["default"].createElement(lucide_react_1.EyeOff, { size: 20 }) : react_1["default"].createElement(lucide_react_1.Eye, { size: 20 })))),
            react_1["default"].createElement("div", { className: "space-y-2" },
                react_1["default"].createElement("label", { className: "text-sm font-medium" }, "Selfie Photo ID"),
                react_1["default"].createElement("div", { className: "flex flex-col items-center space-y-3" }, isCameraOpen ? (react_1["default"].createElement("div", { className: "relative w-full max-w-sm" },
                    react_1["default"].createElement("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "w-full rounded-lg" }),
                    react_1["default"].createElement("button", { type: "button", onClick: takeSelfie, className: "mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" }, "Take Photo"),
                    react_1["default"].createElement("button", { type: "button", onClick: stopCamera, className: "mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors" }, "Cancel"))) : (react_1["default"].createElement("div", { className: "flex flex-col items-center space-y-4" },
                    previewSelfie ? (react_1["default"].createElement("div", { className: "relative w-32 h-32" },
                        react_1["default"].createElement("img", { src: previewSelfie, alt: "Selfie preview", className: "w-full h-full object-cover rounded-full" }),
                        react_1["default"].createElement("button", { type: "button", onClick: function () { return setPreviewSelfie(null); }, className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1" }, "\u00D7"))) : (react_1["default"].createElement("div", { className: "w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.Camera, { size: 40, className: "text-gray-400" }))),
                    react_1["default"].createElement("div", { className: "flex gap-2" },
                        react_1["default"].createElement("input", { type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden", ref: fileInputRef }),
                        react_1["default"].createElement("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm" }, "Take Selfie"),
                        react_1["default"].createElement("button", { type: "button", onClick: startCamera, className: "bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm" },
                            react_1["default"].createElement(lucide_react_1.Camera, { className: "w-5 h-5" }))))))),
            react_1["default"].createElement("button", { type: "submit", disabled: isLoading, className: "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mt-6" }, isLoading ? (react_1["default"].createElement(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin mx-auto" })) : ('Create Account')))));
}
exports.RegistrationForm = RegistrationForm;
exports["default"] = RegistrationForm;
