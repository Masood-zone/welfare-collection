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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserData = exports.getUserInfo = exports.loginUser = exports.registerUser = exports.getAllMembers = exports.getAllAdmins = exports.adminRegisterUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_helper_1 = require("../helpers/user.helper");
const app_error_1 = require("../utils/app-error");
const JWT_SECRET = process.env.JWT_SECRET || "9fb$3Kf&b9x!q3";
// Admin controller functions
const adminRegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const user = yield (0, user_helper_1.createUser)({
            name,
            email,
            password,
            phoneNumber,
            role: "ADMIN",
        });
        res.status(200).json({ message: "Admin registered successfully", user });
    }
    catch (error) {
        // res.status(500).json({ error: "Error registering admin", details: error });
        next(new app_error_1.AppError("Error registering admin", 500));
    }
});
exports.adminRegisterUser = adminRegisterUser;
// Get all admins
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, user_helper_1.findUsersByRole)("ADMIN");
        const adminsWithoutPassword = admins.map((admin) => {
            return Object.assign(Object.assign({}, admin), { password: undefined });
        });
        res.status(200).json({ admins: adminsWithoutPassword });
    }
    catch (error) {
        // res.status(500).json({ error: "Error fetching admins", details: error });
        next(new app_error_1.AppError("Error fetching admins", 500));
    }
});
exports.getAllAdmins = getAllAdmins;
const getAllMembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield (0, user_helper_1.findUsersByRole)("MEMBER");
        const membersWithoutPassword = members.map((member) => {
            return Object.assign(Object.assign({}, member), { password: undefined });
        });
        res.json({
            members: membersWithoutPassword,
        });
    }
    catch (error) {
        // res.status(500).json({ error: "Error fetching members", details: error });
        next(new app_error_1.AppError("Error fetching members", 500));
    }
});
exports.getAllMembers = getAllMembers;
// User controller functions
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const user = yield (0, user_helper_1.createUser)({ name, email, password, phoneNumber });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        // res.status(500).json({ error: "Error registering user", details: error });
        next(new app_error_1.AppError(`Error registering user ${error}`, 500));
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, user_helper_1.findUserByEmail)(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const expiresIn = "1d"; // Token expires in 1 day
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn,
        });
        const userWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
        res.json({
            message: "Login successful",
            user: Object.assign(Object.assign({}, userWithoutPassword), { token,
                expiresIn }),
        });
    }
    catch (error) {
        // res.status(500).json({ error: "Error logging in user", details: error });
        next(new app_error_1.AppError("Error logging in user", 500));
    }
});
exports.loginUser = loginUser;
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield (0, user_helper_1.findUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
        res.json({
            user: userWithoutPassword,
        });
    }
    catch (error) {
        // res.status(500).json({ error: "Error fetching user", details: error });
        next(new app_error_1.AppError("Error fetching user", 500));
    }
});
exports.getUserInfo = getUserInfo;
const updateUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, email, phoneNumber, password } = req.body;
    try {
        const updatedData = {
            name,
            email,
            phoneNumber,
        };
        if (password) {
            updatedData.password = yield bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = yield (0, user_helper_1.updateUser)(userId, updatedData);
        res.json({
            message: "User data updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        // res
        //   .status(500)
        //   .json({ error: "Error updating user profile", details: error });
        next(new app_error_1.AppError("Error updating user profile", 500));
    }
});
exports.updateUserData = updateUserData;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield (0, user_helper_1.findUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        yield (0, user_helper_1.deleteUserById)(userId);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        // res.status(500).json({ error: "Error deleting user", details: error });
        next(new app_error_1.AppError("Error deleting user", 500));
    }
});
exports.deleteUser = deleteUser;
