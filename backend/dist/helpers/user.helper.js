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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.findUserById = exports.updateUser = exports.findUsersByRole = exports.findUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt = __importStar(require("bcrypt"));
const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return db_1.default.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return db_1.default.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const findUsersByRole = async (role) => {
    return db_1.default.user.findMany({
        where: { role },
    });
};
exports.findUsersByRole = findUsersByRole;
const updateUser = async (id, data) => {
    return db_1.default.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const findUserById = async (id) => {
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
};
exports.findUserById = findUserById;
const deleteUserById = async (id) => {
    return db_1.default.user.delete({
        where: { id },
    });
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user.helper.js.map