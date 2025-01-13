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
function ObjectForm(_a) {
    var _this = this;
    var initialData = _a.initialData, onSubmit = _a.onSubmit, onCancel = _a.onCancel;
    var _b = react_1.useState(initialData || {
        name: '',
        category: '',
        room: '',
        quantity: 1,
        description: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = react_1.useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = react_1.useState(''), error = _d[0], setError = _d[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, onSubmit(formData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setError('An error occurred. Please try again.');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement("div", null,
            React.createElement("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700" }, "Name"),
            React.createElement("input", { type: "text", id: "name", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, className: "mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })),
        React.createElement("div", null,
            React.createElement("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700" }, "Category"),
            React.createElement("input", { type: "text", id: "category", value: formData.category, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { category: e.target.value })); }, className: "mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })),
        React.createElement("div", null,
            React.createElement("label", { htmlFor: "room", className: "block text-sm font-medium text-gray-700" }, "Room"),
            React.createElement("input", { type: "text", id: "room", value: formData.room, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { room: e.target.value })); }, className: "mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })),
        React.createElement("div", null,
            React.createElement("label", { htmlFor: "quantity", className: "block text-sm font-medium text-gray-700" }, "Quantity"),
            React.createElement("input", { type: "number", id: "quantity", min: "1", value: formData.quantity, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { quantity: parseInt(e.target.value) })); }, className: "mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true })),
        React.createElement("div", null,
            React.createElement("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700" }, "Description"),
            React.createElement("textarea", { id: "description", value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }, className: "mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", rows: 3 })),
        error && (React.createElement("div", { className: "text-red-500 text-sm" }, error)),
        React.createElement("div", { className: "flex justify-end space-x-4" },
            React.createElement("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" }, "Cancel"),
            React.createElement("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50" }, isSubmitting ? 'Saving...' : 'Save'))));
}
exports["default"] = ObjectForm;
