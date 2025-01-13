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
exports.POST = void 0;
var server_1 = require("next/server");
var bcryptjs_1 = require("bcryptjs");
var auth_1 = require("@/lib/validations/auth");
var prisma_1 = require("@/lib/prisma");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, _a, email, password, fullName, existingUser, hashedPassword, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _b.sent();
                    _a = auth_1.registerSchema.parse(body), email = _a.email, password = _a.password, fullName = _a.fullName;
                    return [4 /*yield*/, prisma_1["default"].user.findUnique({
                            where: { email: email }
                        })];
                case 2:
                    existingUser = _b.sent();
                    if (existingUser) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "User already exists" }, { status: 409 })];
                    }
                    return [4 /*yield*/, bcryptjs_1.hash(password, 10)];
                case 3:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, prisma_1["default"].user.create({
                            data: {
                                name: fullName,
                                email: email,
                                password: hashedPassword
                            }
                        })];
                case 4:
                    user = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "User created successfully" }, { status: 201 })];
                case 5:
                    error_1 = _b.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Something went wrong" }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
