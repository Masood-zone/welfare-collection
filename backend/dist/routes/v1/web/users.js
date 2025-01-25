"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../../../controllers/users.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/admin/register", async (req, res, next) => {
    try {
        await (0, users_controller_1.adminRegisterUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.post("/register", async (req, res, next) => {
    try {
        await (0, users_controller_1.registerUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.post("/login", async (req, res, next) => {
    try {
        await (0, users_controller_1.loginUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/admin/list", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, users_controller_1.getAllAdmins)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/list", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, users_controller_1.getAllMembers)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, users_controller_1.getUserInfo)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await (0, users_controller_1.deleteUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.patch("/update/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await (0, users_controller_1.updateUserData)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRoutes;
//# sourceMappingURL=users.js.map