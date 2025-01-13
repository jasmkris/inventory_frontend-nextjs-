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
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var fi_1 = require("react-icons/fi");
var md_1 = require("react-icons/md");
function RegisterPage() {
    var _this = this;
    var _a = react_1.useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = react_1.useState(false), showConfirmPassword = _c[0], setShowConfirmPassword = _c[1];
    var _d = react_1.useState(null), selfieImage = _d[0], setSelfieImage = _d[1];
    var _e = react_1.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState(''), error = _f[0], setError = _f[1];
    var videoRef = react_1.useRef(null);
    var streamRef = react_1.useRef(null);
    var _g = react_1.useState(false), isCameraOpen = _g[0], setIsCameraOpen = _g[1];
    var router = navigation_1.useRouter();
    var handleInputChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
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
                    setError('Unable to access camera');
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
                setSelfieImage(imageData);
                stopCamera();
            }
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            setIsLoading(true);
            setError('');
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                setIsLoading(false);
                return [2 /*return*/];
            }
            if (!selfieImage) {
                setError('Please take a selfie photo');
                setIsLoading(false);
                return [2 /*return*/];
            }
            try {
                // Implement your registration logic here
                // const response = await registerUser({ ...formData, selfieImage });
                router.push('/login');
            }
            catch (error) {
                setError('Registration failed. Please try again.');
            }
            finally {
                setIsLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "w-full max-w-md" },
            React.createElement("div", { className: "flex mb-6" },
                React.createElement(link_1["default"], { href: "/login", className: "flex-1 py-4 text-center border-b-2 border-gray-200 text-gray-500 hover:text-gray-700 transition-colors" }, "Login"),
                React.createElement("button", { className: "flex-1 py-4 text-center border-b-2 border-blue-500 text-blue-500 font-medium" }, "Register")),
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h1", { className: "text-2xl font-bold text-gray-900 mb-2" }, "Create Account"),
                React.createElement("p", { className: "text-gray-600" }, "Sign up to get started")),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "fullName", className: "block text-sm font-medium text-gray-700 mb-1" }, "Full Name"),
                    React.createElement("input", { id: "fullName", name: "fullName", type: "text", value: formData.fullName, onChange: handleInputChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your full name", required: true })),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1" }, "Email"),
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "email", name: "email", type: "email", value: formData.email, onChange: handleInputChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your email", required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return navigator.clipboard.writeText(formData.email); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" },
                            React.createElement(md_1.MdContentCopy, { className: "w-5 h-5" })))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1" }, "Password"),
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "password", name: "password", type: showPassword ? 'text' : 'password', value: formData.password, onChange: handleInputChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Create a password", required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return setShowPassword(!showPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" }, showPassword ? (React.createElement(fi_1.FiEyeOff, { className: "w-5 h-5" })) : (React.createElement(fi_1.FiEye, { className: "w-5 h-5" }))))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 mb-1" }, "Confirm Password"),
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "confirmPassword", name: "confirmPassword", type: showConfirmPassword ? 'text' : 'password', value: formData.confirmPassword, onChange: handleInputChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Confirm your password", required: true }),
                        React.createElement("button", { type: "button", onClick: function () { return setShowConfirmPassword(!showConfirmPassword); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" }, showConfirmPassword ? (React.createElement(fi_1.FiEyeOff, { className: "w-5 h-5" })) : (React.createElement(fi_1.FiEye, { className: "w-5 h-5" }))))),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Selfie Photo ID"),
                    React.createElement("div", { className: "flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6" }, isCameraOpen ? (React.createElement("div", { className: "relative w-full" },
                        React.createElement("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "w-full rounded-lg" }),
                        React.createElement("button", { type: "button", onClick: takeSelfie, className: "mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" }, "Take Selfie"))) : selfieImage ? (React.createElement("div", { className: "relative w-full" },
                        React.createElement("img", { src: selfieImage, alt: "Selfie", className: "w-full rounded-lg" }),
                        React.createElement("button", { type: "button", onClick: function () {
                                setSelfieImage(null);
                                startCamera();
                            }, className: "mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" }, "Retake Selfie"))) : (React.createElement("button", { type: "button", onClick: startCamera, className: "flex flex-col items-center justify-center w-full h-40 text-gray-500 hover:text-gray-700" },
                        React.createElement(fi_1.FiCamera, { className: "w-12 h-12 mb-2" }),
                        React.createElement("span", null, "Take Selfie"))))),
                error && (React.createElement("div", { className: "text-red-500 text-sm text-center" }, error)),
                React.createElement("button", { type: "submit", disabled: isLoading, className: "w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" }, isLoading ? 'Creating Account...' : 'Create Account')))));
}
exports["default"] = RegisterPage;
