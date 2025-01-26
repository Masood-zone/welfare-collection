"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user = __importStar(require("../../../controllers/users.controller"));
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const userRoutes = (0, express_1.Router)();
// Admin Routes
userRoutes.post("/admin/register", user.adminRegisterUser);
// User Routes
userRoutes.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.registerUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
userRoutes.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.loginUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// List all users routes
userRoutes.get("/admin/list", auth_middleware_1.authenticateAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.getAllAdmins(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
userRoutes.get("/list", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.getAllMembers(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Get user info
userRoutes.get("/:id", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.getUserInfo(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Delete user route
userRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.deleteUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Update user data route
userRoutes.patch("/update/:id", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.updateUserData(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userRoutes;
