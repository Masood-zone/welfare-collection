"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.Role = void 0;
const zod_1 = require("zod");
exports.Role = zod_1.z.enum([
    "ADMIN",
    "MEMBER"
]);
exports.userSchema = zod_1.z.object({
    fullname: zod_1.z.string({ required_error: "Full name cannot be empty" })
        .trim()
        .min(5, "Full name must be at least 5 characters long"),
    email: zod_1.z.string().email("please provide a valid email")
        .trim(),
    phoneNumber: zod_1.z.string({ required_error: "Please provide a phone number" })
        .min(10, "Phone number must be at least 10 digits long")
        .max(15, "Phone number must be at most 15 digits long"),
    password: zod_1.z.string({ required_error: "Please provide a password" }).min(8, "Password must be at least 8 characters long"),
    role: exports.Role,
});
