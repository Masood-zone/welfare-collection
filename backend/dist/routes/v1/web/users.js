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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../../../controllers/users.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const userRoutes = (0, express_1.Router)();
// Admin Routes
userRoutes.post("/admin/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.adminRegisterUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// User Routes
userRoutes.post("/register", users_controller_1.registerUser);
userRoutes.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.loginUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// List all users routes
userRoutes.get("/admin/list", auth_middleware_1.authenticateAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.getAllAdmins)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
userRoutes.get("/list", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.getAllMembers)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Get user info
userRoutes.get("/:id", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.getUserInfo)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Delete user route
userRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.deleteUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
// Update user data route
userRoutes.patch("/update/:id", auth_middleware_1.authenticateUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_controller_1.updateUserData)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userRoutes;
