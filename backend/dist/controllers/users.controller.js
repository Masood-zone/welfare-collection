"use strict";
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
const adminRegisterUser = async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const user = await (0, user_helper_1.createUser)({
            name,
            email,
            password,
            phoneNumber,
            role: "ADMIN",
        });
        const adminWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
        res.status(200).json({
            message: "Admin registered successfully",
            user: Object.assign({}, adminWithoutPassword),
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error registering admin", 500));
    }
};
exports.adminRegisterUser = adminRegisterUser;
const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await (0, user_helper_1.findUsersByRole)("ADMIN");
        const adminsWithoutPassword = admins.map((admin) => {
            return Object.assign(Object.assign({}, admin), { password: undefined });
        });
        res.status(200).json({ admins: adminsWithoutPassword });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching admins", 500));
    }
};
exports.getAllAdmins = getAllAdmins;
const getAllMembers = async (req, res, next) => {
    try {
        const members = await (0, user_helper_1.findUsersByRole)("MEMBER");
        const membersWithoutPassword = members.map((member) => {
            return Object.assign(Object.assign({}, member), { password: undefined });
        });
        res.json({
            members: membersWithoutPassword,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching members", 500));
    }
};
exports.getAllMembers = getAllMembers;
const registerUser = async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const existingUser = await (0, user_helper_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await (0, user_helper_1.createUser)({ name, email, password, phoneNumber });
        const expiresIn = "1d";
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
            expiresIn,
        });
        res.status(201).json({
            message: "User registered successfully",
            user: Object.assign(Object.assign({}, newUser), { password: undefined, token }),
        });
    }
    catch (error) {
        next(new app_error_1.AppError(`Error registering user ${error}`, 500));
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await (0, user_helper_1.findUserByEmail)(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const expiresIn = "1d";
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
        next(new app_error_1.AppError("Error logging in user", 500));
    }
};
exports.loginUser = loginUser;
const getUserInfo = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await (0, user_helper_1.findUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
        res.json({
            user: userWithoutPassword,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching user", 500));
    }
};
exports.getUserInfo = getUserInfo;
const updateUserData = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, phoneNumber, password } = req.body;
    try {
        const updatedData = {
            name,
            email,
            phoneNumber,
        };
        if (password) {
            updatedData.password = await bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = await (0, user_helper_1.updateUser)(userId, updatedData);
        res.json({
            message: "User data updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error updating user profile", 500));
    }
};
exports.updateUserData = updateUserData;
const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await (0, user_helper_1.findUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        await (0, user_helper_1.deleteUserById)(userId);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(new app_error_1.AppError("Error deleting user", 500));
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map