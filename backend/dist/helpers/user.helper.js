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
exports.deleteUserById = exports.findUserById = exports.updateUser = exports.findUsersByRole = exports.findUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    return db_1.default.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.user.findUnique({
        where: { email },
    });
});
exports.findUserByEmail = findUserByEmail;
const findUsersByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.user.findMany({
        where: { role },
    });
});
exports.findUsersByRole = findUsersByRole;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.user.update({
        where: { id },
        data,
    });
});
exports.updateUser = updateUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            role: true,
        },
    });
});
exports.findUserById = findUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.user.delete({
        where: { id },
    });
});
exports.deleteUserById = deleteUserById;
