"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const enrollments_1 = __importDefault(require("./enrollments"));
const analytics_1 = __importDefault(require("./analytics"));
const expenses_1 = __importDefault(require("./expenses"));
const payments_1 = __importDefault(require("./payments"));
const payment_tracker_1 = __importDefault(require("./payment-tracker"));
const welfares_1 = __importDefault(require("./welfares"));
const webRoute = (0, express_1.Router)();
webRoute.use("/user", users_1.default);
webRoute.use("/welfare-programs", welfares_1.default);
webRoute.use("/enrollments", enrollments_1.default);
webRoute.use("/analytics", analytics_1.default);
webRoute.use("/expenses", expenses_1.default);
webRoute.use("/payments", payments_1.default);
webRoute.use("/payment-tracker", payment_tracker_1.default);
exports.default = webRoute;
//# sourceMappingURL=index.js.map