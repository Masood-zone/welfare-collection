"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "9fb$3Kf&b9x!q3Nv2sTz5@vQ6mC*wX1h";
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access token is missing or invalid" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (Date.now() >= payload.exp * 1000) {
            res.status(401).json({ error: "Token has expired" });
            return;
        }
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.authenticateUser = authenticateUser;
const authenticateAdmin = (req, res, next) => {
    (0, exports.authenticateUser)(req, res, (err) => {
        var _a;
        if (err) {
            next(err);
            return;
        }
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
            res.status(403).json({ error: "Access denied: Admins only" });
            return;
        }
        next();
    });
};
exports.authenticateAdmin = authenticateAdmin;
//# sourceMappingURL=auth.middleware.js.map