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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorHandler_1 = require("../middlewares/errorHandler");
const http_status_1 = require("../utils/http-status");
const user_validator_1 = require("../validators/user.validator");
const bcrypt_1 = require("../utils/bcrypt");
exports.userServices = {
    createUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const validatedData = user_validator_1.userSchema.safeParse(data);
        if (!validatedData.success) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, validatedData.error.issues.map(({ message }) => message).join(", "));
            const checkUserAvailability = yield prisma_1.default.user.findUnique({ where: { email: data.email } });
            if (checkUserAvailability) {
                (0, errorHandler_1.throwError)(http_status_1.HttpStatus.CONFLICT, "Email already exists");
            }
        }
        else {
            const hashedPassword = yield (0, bcrypt_1.hash)(data.password);
            const newUser = yield prisma_1.default.user.create({
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    password: hashedPassword,
                },
            });
            const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            return userWithoutPassword;
            ;
        }
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield prisma_1.default.user.findMany();
        if (!users.length) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "No users found");
        }
        else {
            const usersWithoutPassword = users.map((user) => ({
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            }));
            return usersWithoutPassword;
        }
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "User not found");
        }
        else {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "User not found");
        }
        else {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
    }),
    updateUser: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield prisma_1.default.user.update({
            where: { id },
            data: Object.assign({}, data),
        });
        if (!updatedUser) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "User not found");
        }
        else {
            return updatedUser;
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield prisma_1.default.user.delete({ where: { id } });
        if (!deletedUser) {
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.NOT_FOUND, "User not found");
        }
        else {
            return deletedUser;
        }
    })
};
