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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user = __importStar(require("../../../controllers/users.controller"));
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/admin/register", user.adminRegisterUser);
userRoutes.post("/register", async (req, res, next) => {
    try {
        await user.registerUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.post("/login", async (req, res, next) => {
    try {
        await user.loginUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/admin/list", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await user.getAllAdmins(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/list", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await user.getAllMembers(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.get("/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await user.getUserInfo(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, async (req, res, next) => {
    try {
        await user.deleteUser(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
userRoutes.patch("/update/:id", auth_middleware_1.authenticateUser, async (req, res, next) => {
    try {
        await user.updateUserData(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = userRoutes;
//# sourceMappingURL=users.js.map